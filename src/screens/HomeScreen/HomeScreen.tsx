import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import ContactScreen from './ContactScreen';
import MessageScreen from './MessageScreen';
import MoreScreen from './MoreScreen';
import FooterComponent from '../../component/FooterComponent/FooterComponent';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';
import MessageService from '../../utils/messsageServices/messageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {NewMessage, NotificationData} from '../../context/chatContext';

const HomeScreen = () => {
  const [iconText, setIconText] = useState('');
  // console.log('homeScreen compoentn rerender checks');
  const {setNotification} = useContext(NotificationData);
  const {setNewMessage} = useContext(NewMessage);

  useEffect(() => {
    const fetchCurrentUserAndUnseenMessages = async () => {
      try {
        const currentUserId = await AsyncStorage.getItem('uid');

        const userRef = firebase.firestore().collection('users');
        userRef.where('uid', '!=', currentUserId).onSnapshot(async snapshot => {
          const contactData: {id: string; userName: string}[] =
            snapshot.docs.map(doc => ({
              id: doc.id,
              userName: doc.data().userName,
              ...doc.data(),
            }));

          const newNotificationsArray: any[] = [];

          // Listen for messages and update the state
          for (const contact of contactData) {
            const unseenMessages = await MessageService.getUnseenMessages(
              contact.id,
              currentUserId || '',
            );

            const notificationData = {
              id: contact.id,
              userName: contact.userName,
              unseenMessages: unseenMessages.map(message => message.message),
            };

            newNotificationsArray.push(notificationData);
          }

          if (setNotification) {
            setNotification(newNotificationsArray);
          }

          const allUnseenMessages = newNotificationsArray
            .map(notification => notification.unseenMessages)
            .flat();

          setNewMessage(allUnseenMessages);

          console.log(
            'unseen messages for in Home screen',
            newNotificationsArray,
          );
        });
      } catch (error) {
        console.error('Error fetching user ID or unseen messages:', error);
      }
    };

    fetchCurrentUserAndUnseenMessages();
  }, [setNotification, setNewMessage]);
  return (
    <>
      <View className="h-full mb-3 bg-white">
        <KeyboardAvoidingWrapper>
          {iconText === 'more-horizontal' ? (
            <MoreScreen />
          ) : iconText === 'users' ? (
            <ContactScreen />
          ) : (
            <MessageScreen />
          )}

          <FooterComponent setIconText={setIconText} />
        </KeyboardAvoidingWrapper>
      </View>
    </>
  );
};

export default HomeScreen;
