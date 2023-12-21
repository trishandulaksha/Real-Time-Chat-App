import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';
import Icon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
  return (
    <>
      <View className="h-full  ">
        {/* Header View  */}

        <View className="flex flex-row items-center justify-between bg-white p-4">
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity>
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
            <Text className="text-xl text-black">Trishan Dulaksha</Text>
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

        <View className="h-full flex-1 ">
          <KeyboardAvoidingWrapper>
            <View className="bg-blue-400 p-2 self-start m-1 rounded-t-xl rounded-br-xl">
              <Text>Hellow Broh</Text>
              <Text>9.39</Text>
            </View>
            <View className="bg-blue-400 p-2 self-end m-1 rounded-t-xl rounded-bl-xl">
              <Text>Hellow Broh</Text>
              <Text>9.39</Text>
            </View>
          </KeyboardAvoidingWrapper>
        </View>

        {/* KeyBoard View  */}
        <View className="flex flex-row items-center mt-auto bg-white pt-2 pb-1">
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
                className="border rounded-3xl px-6 mr-2"
              />
            </TouchableOpacity>
          </View>
          <View className="w-[8%]  ">
            <TouchableOpacity>
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
