import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Feather';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';

const ContactScreen = () => {
  return (
    <>
      <KeyboardAvoidingWrapper>
        <View className="pb-2 ">
          <View className="flex flex-row items-center justify-between mx-6 mt-6 mb-4">
            <Text className="text-xl font-semibold text-black">Contacts</Text>
            <TouchableOpacity>
              <Icon name="plus" size={22} style={{color: 'black'}} />
            </TouchableOpacity>
          </View>
          <View className="mx-6 mt-7">
            <TouchableOpacity className="absolute z-10 items-center justify-center p-3">
              <Icon name="search" size={20} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              className="items-center justify-center pl-10 bg-slate-100 "
            />
          </View>
          <View className="pb-1 mx-6 mt-3 border-b border-gray-300 ">
            <TouchableOpacity className="flex flex-row">
              <View className="p-0 m-0">
                <Image
                  source={require('../../asstes/images/profileImg.png')}
                  className="w-24 h-24 rounded-full"
                />
              </View>
              <View className="pt-4 pl-1">
                <Text className="text-base font-bold text-black">
                  Trishan Dulaksha
                </Text>
                <Text className="pt-2 text-gray-500">online</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export default ContactScreen;
