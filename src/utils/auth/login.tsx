import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

interface signinDataProps {
  email: string;
  password: string;
  setDbResponse: React.Dispatch<React.SetStateAction<string>>;
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}

export const loginController = (signinData: signinDataProps) => {
  const {email, password, setDbResponse} = signinData;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      Alert.alert('User Sign in Success' + userCredential);
      const usersCollection = firestore().collection('users');
      console.log('Collection data', usersCollection);
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
        setDbResponse('User Name or Password incorrect');
      }
    });
};
