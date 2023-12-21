import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../../my-app';

const MainScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <>
      <View className="h-full border border-red-700 border-spacing-4">
        <View className="mt-10 ml-auto mr-auto w-60 h-60">
          <Image
            source={require('../../../asstes/images/mainScreenImage.png')}
            style={{resizeMode: 'contain', width: '100%', height: '100%'}}
          />
        </View>
        <View>
          <Text className="px-24 mt-12 ml-auto mr-auto text-xl font-extrabold text-center text-black shadow-xl">
            Connect easily with your family and friends over countries
          </Text>
        </View>
        <View className="items-center justify-center flex-1 mb-7">
          <View className="absolute bottom-0 items-center ">
            <TouchableOpacity>
              <Text className="mb-4 text-black">Terms & Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-800 rounded-3xl ">
              <Text
                className="py-3 text-white px-28 "
                onPress={() => {
                  navigation.navigate('loginscreen');
                }}>
                Start Messaging
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
