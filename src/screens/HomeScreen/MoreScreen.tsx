import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../my-app';
import {signoutController} from '../../utils/auth/signout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoreScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        setCurrentUserName(userName);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchData();
  }, []);
  const signoutHandle = () => {
    signoutController(navigation);
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <View className="flex mt-6 ml-auto mr-auto">
          <Text className="text-3xl font-extrabold">{currentUserName}</Text>
        </View>
      </KeyboardAvoidingWrapper>
      <TouchableOpacity className="flex items-center w-56 mb-5 ml-auto mr-auto bg-slate-300 rounded-xl">
        <Text onPress={signoutHandle} className="p-4 font-extrabold">
          Sign Out
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default MoreScreen;
