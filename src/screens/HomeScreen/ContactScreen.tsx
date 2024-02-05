import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome6';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../my-app';

import NotificationIcon from '../Notification/notificationIcon/NotificationIcon';

const ContactScreen = () => {
  const [contactsData, setContact] = useState<
    Array<{id: string; userName: string}>
  >([]);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  console.log('Search Text', searchText);
  // console.log('COntact Screen rerender chekc');

  const fetchContacts = async () => {
    const currentUserId = await AsyncStorage.getItem('uid');
    const userRef = firebase.firestore().collection('users');

    userRef.where('uid', '!=', currentUserId).onSnapshot(snapshot => {
      const contactData: {id: string; userName: string}[] = snapshot.docs.map(
        doc => ({
          id: doc.id,
          userName: doc.data().userName,
          ...doc.data(),
        }),
      );
      console.log(contactData);
      setContact(contactData);
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const renderContactCard = (contact: {
    id: string;
    userName?: string;
    status?: string;
  }) => (
    <TouchableOpacity
      className="flex flex-row border-b border-gray-300 "
      key={contact.id}
      onPress={() => {
        navigation.navigate('chatscreen', {
          contactId: contact.id,
          userName: contact.userName,
        });
      }}>
      <View className="p-0 m-0">
        <Image
          source={require('../../asstes/images/profileImg.png')}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View className="pt-4 pl-1">
        <Text className="text-base font-bold text-black">
          {contact.userName}
        </Text>

        <View className="flex flex-row items-center pt-2 text-gray-500 ">
          <View>
            <Icon
              name="circle"
              size={8}
              style={{
                backgroundColor: contact.status === 'online' ? 'green' : 'gray',
                borderRadius: 20,
              }}
            />
          </View>
          <View className="ml-2">
            <Text> {contact.status === 'online' ? 'online' : 'offline'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <KeyboardAvoidingWrapper>
        <View className="pb-2 ">
          <View className="flex flex-row items-center justify-between mx-6 mt-6 mb-4">
            <Text className="text-xl font-semibold text-black">Contacts</Text>
            <TouchableOpacity>
              <NotificationIcon />
            </TouchableOpacity>
          </View>
          <View className="mx-6 mt-7">
            <TouchableOpacity className="absolute z-10 items-center justify-center p-3">
              <Icon name="magnifying-glass" size={20} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              onChangeText={(text: string) => {
                setSearchText(text);
              }}
              className="items-center justify-center pl-10 bg-slate-100 "
            />
          </View>
          <View className="pb-1 mx-6 mt-3 ">
            {contactsData.length > 0 ? (
              contactsData.map(renderContactCard)
            ) : (
              <View className="mt-6">
                <Text>Nothing to show contact</Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export default ContactScreen;
