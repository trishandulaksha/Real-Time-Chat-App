/// <reference types="nativewind/types" />

import {RouteProp} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MyStackParamList = {
  otpvalidationscreen: {email: string};
  Splash: undefined;
  main: undefined;

  homescreen: undefined;
  profilescreen: undefined;
  loginscreen: undefined;
  chatscreen: {params: {contactId: string; userName?: string}};
  resetpasswordscreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  MyStackParamList,
  chatscreen,
  main,
  Splash,
  profilescreen,
  otpvalidationscreen,
  resetpasswordscreen,
  loginscreen
>;

export type inputTypeProp = {
  placeholder: string;
  textSecure: boolean;
  label: string;
  errorMsgBase: string;
  onChangeText: (text: string) => void;

  setCanSubmit: (error: boolean) => void;
};

type chatScreenRouteProp = RouteProp<MyStackParamList, 'chatscreen'>;

export type Props = {
  route: chatScreenRouteProp;
};
