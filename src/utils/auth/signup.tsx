import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface SignUpData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setDbResponse: React.Dispatch<React.SetStateAction<string>>;
  setCheckScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}

export const signUpController = async (signUpData: SignUpData) => {
  const {
    userName,
    email,
    password,
    setDbResponse,
    setCheckScreen,
    setShowSplash,
    navigation,
  } = signUpData;

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    setShowSplash(true);
    const userRef = firestore().collection('users').doc(user.uid);

    await userRef.set({
      uid: user.uid,
      userName,
      email,
    });

    setTimeout(() => {
      setCheckScreen(false);
      navigation.navigate('loginscreen');
      setShowSplash(false);
    }, 3000);
    Alert.alert('User successfully created');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      setDbResponse('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      setDbResponse('That email address is invalid!');
    } else {
      setDbResponse('Error creating user. Please try again.');
    }
  }
};
