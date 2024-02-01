import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MessageService from '../../utils/messsageServices/messageService';
import {HomeScreenNavigationProp, Props} from '../../../my-app';

const ChatScreen: React.FC<Props> = ({route}) => {
  const {contactId, userName} = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessage] = useState<any[]>();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const flatListRef = useRef<FlatList | null>(null);
  const [seenStatusChanged, setSeenStatusChanged] = useState<boolean>(true);

  console.log('Chat screen rerender check ');
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const userID = await AsyncStorage.getItem('uid');
  //       setCurrentUser(userID);
  //     } catch (error) {
  //       console.error('Error fetching user ID:', error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  useEffect(() => {
    const fetchCurrentUserAndUnseenMessages = async () => {
      try {
        const userID = await AsyncStorage.getItem('uid');
        setCurrentUser(userID);

        // Fetch unseen messages
        const unseenMessages = await MessageService.getUnseenMessages(
          contactId,
          userID || '',
        );
        console.log('Unseen Messages in useEffect:', unseenMessages);
      } catch (error) {
        console.error('Error fetching user ID or unseen messages:', error);
      }
    };

    fetchCurrentUserAndUnseenMessages();
  }, [contactId]);
  useEffect(() => {
    const unsubscribe = MessageService.listenForMessage(
      contactId,
      conversation => {
        setMessage([...conversation]);
      },
      currentUser || '',
      () => {
        setSeenStatusChanged(false);
      },
    );

    return () => {
      unsubscribe();
      setSeenStatusChanged(true);
    };
  }, [contactId, currentUser]);

  const handleSendMessage = async () => {
    if (messageText.trim() !== '') {
      await MessageService.sendMessage(
        contactId,
        messageText,
        currentUser || '',
      );
      setMessageText(' ');
    }
  };
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
      MessageService.markMessageAsSeen(contactId, currentUser || '');
    }
  }, [messages, contactId, currentUser]);

  return (
    <>
      <View className="h-full ">
        {/* Header View  */}

        <View className="flex flex-row items-center justify-between p-4 bg-white">
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                name="chevron-left"
                size={30}
                style={{
                  color: 'black',
                  paddingRight: 2,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}
              />
            </TouchableOpacity>
            <Text className="text-xl text-black">{userName}</Text>
          </View>
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity>
              <Icon
                name="search"
                size={30}
                style={{color: 'black', paddingRight: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="navicon" size={30} style={{color: 'black'}} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Message View  */}
        <View className="flex-1 h-full ">
          <KeyboardAvoidingView>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item}) =>
                item.createdAt && (
                  <View
                    className={`flex ${
                      item.sender === currentUser ? ' self-end' : ' self-start'
                    } m-1  `}>
                    <View
                      className={`bg-blue-400 p-4 rounded-t-xl  ${
                        item.sender === currentUser
                          ? ' rounded-bl-xl ml-1'
                          : ' rounded-br-xl mr-1'
                      }`}>
                      <Text>{item.text}</Text>
                      <View className="flex flex-row items-center justify-between">
                        <Text>
                          {item.createdAt &&
                            item.createdAt.toDate().toLocaleTimeString([], {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: false,
                            })}
                        </Text>
                        <View
                          className={`ml-3  ${
                            item.sender === currentUser ? 'block' : 'hidden'
                          }`}>
                          {!item.seen && !seenStatusChanged ? (
                            <FontIcon name="check" style={{color: 'black'}} />
                          ) : (
                            <FontIcon name="check-double" color={'darkblue'} />
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }
              onContentSizeChange={() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToEnd({animated: false});
                }
              }}
            />
          </KeyboardAvoidingView>
        </View>

        {/* KeyBoard View  */}
        <View className="flex flex-row items-center pt-2 pb-1 mt-auto bg-white">
          <View className="w-[8%] ">
            <TouchableOpacity>
              <FIcon
                name="plus"
                size={25}
                style={{color: 'black', marginLeft: 2}}
              />
            </TouchableOpacity>
          </View>
          <View className="w-[84%] ">
            <TouchableOpacity>
              <TextInput
                placeholder="Type here"
                className="px-6 mr-2 border rounded-3xl"
                value={messageText}
                onChangeText={text => setMessageText(text)}
              />
            </TouchableOpacity>
          </View>
          <View className="w-[8%]  ">
            <TouchableOpacity onPress={handleSendMessage}>
              <FIcon
                name="send"
                style={{color: 'blue', paddingRight: 6}}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChatScreen;
