import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MessageService from '../../utils/messsageServices/messageService';
import {HomeScreenNavigationProp, Props} from '../../../my-app';
import {NewMessage} from '../../context/chatContext';

const ChatScreen: React.FC<Props> = ({route}) => {
  const {contactId, userName} = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<string[]>();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const flatListRef = useRef<FlatList | null>(null);
  const [seenStatusChanged, setSeenStatusChanged] = useState<boolean>(true);
  const {setNewMessage} = useContext(NewMessage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log('Chat screen rerender check ');

  //Fectch the Current User
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userID = await AsyncStorage.getItem('uid');
        setCurrentUser(userID);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // listen for messages
  useEffect(() => {
    const unsubscribe = MessageService.listenForMessage(
      contactId,
      conversation => {
        setMessages([...conversation]);
      },
      currentUser || '',
      () => {
        setSeenStatusChanged(false);
      },
      currentPage,
    );
    return () => {
      unsubscribe();
      setSeenStatusChanged(true);
    };
  }, [contactId, currentUser, currentPage]);

  //handle sent messages
  const handleSendMessage = async () => {
    if (messageText.trim() !== '') {
      await MessageService.sendMessage(
        contactId,
        messageText,
        currentUser || '',
      );
      setMessageText(' ');
      setNewMessage(messages || []);
    }
  };

  // Handle seen to unseeen message
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages, contactId, currentUser]);

  const handleScroll = (event: any) => {
    const offsetY = event?.nativeEvent?.contentOffset.y || 0;
    const threshold = 10;

    if (offsetY <= threshold) {
      setCurrentPage(currentPage + 1);
    }
  };
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
              onScroll={({nativeEvent}) => handleScroll({nativeEvent})}
              onContentSizeChange={() => {
                if (flatListRef.current) {
                  MessageService.markMessageAsSeen(
                    contactId,
                    currentUser || '',
                  );
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
