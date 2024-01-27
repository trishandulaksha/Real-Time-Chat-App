import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import {Alert} from 'react-native';
import {updateStatus} from './login';

export const signoutController = async (navigation: any) => {
  try {
    await auth().signOut();

    const uid = await AsyncStorage.getItem('uid');
    if (uid) {
      await updateStatus(uid, 'offline');
    }

    await AsyncStorage.removeItem('uid');
    await AsyncStorage.removeItem('userName');

    setTimeout(() => {
      navigation.navigate('loginscreen');
      Alert.alert('Sign out Successfully');
    }, 2000);
  } catch (error) {
    console.error('Signout error:', error);
  }
};
