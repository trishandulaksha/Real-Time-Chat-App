import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface signinDataProps {
  email: string;
  password: string;
  setDbResponse: React.Dispatch<React.SetStateAction<string>>;
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}
const goNext = async (userName: string, uid: string) => {
  const existingUid = await AsyncStorage.getItem('uid');

  if (existingUid) {
    await AsyncStorage.removeItem('uid');
  }
  await AsyncStorage.setItem('userName', userName);
  await AsyncStorage.setItem('uid', uid);
  await updateStatus(uid, 'online');
};

export const updateStatus = async (uid: string, status: string) => {
  await firestore().collection('users').doc(uid).update({
    status: status,
  });
};
export const loginController = async (signinData: signinDataProps) => {
  const {email, password, setDbResponse, setShowSplash, navigation} =
    signinData;
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('Login data passed');
    // console.log(response.user);
    setShowSplash(true);

    const response = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();
    if (response) {
      goNext(response.docs[0].data().userName, response.docs[0].data().uid);
    }

    Alert.alert('User Sign in Success');
    setTimeout(() => {
      navigation.navigate('homescreen');
      setShowSplash(false);
    }, 1000);
  } catch (err: any) {
    console.log(err);
    if (err.code === 'auth/invalid-credential') {
      setDbResponse('User Name or Password incorrect');
    } else if (err.code === 'auth/network-request-failed') {
      setDbResponse('A network error');
    }
  }
};
