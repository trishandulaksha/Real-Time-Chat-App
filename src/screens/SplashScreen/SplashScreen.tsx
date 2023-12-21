import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View className="flex-1 h-full ">
      <View className="mt-auto mb-auto ml-auto mr-auto">
        <Text className="mb-0 font-serif font-extrabold text-center text-blue-900 shadow-2xl text-7xl">
          TChat
        </Text>
        <View className="mt-32">
          <ActivityIndicator size={'large'} color={'#43C652'} />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
