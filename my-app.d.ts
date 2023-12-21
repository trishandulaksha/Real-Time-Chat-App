/// <reference types="nativewind/types" />

import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MyStackParamList = {
  otpvalidationscreen: {email: string};
  Splash: undefined;
  main: undefined;

  homescreen: undefined;
  profilescreen: undefined;
  loginscreen: undefined;
  chatscreen: undefined;
  resetpasswordscreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  MyStackParamList,
  main,
  Splash,
  profilescreen,
  otpvalidationscreen,
  resetpasswordscreen,
  loginscreen,
  chatscreen
>;

export type inputTypeProp = {
  placeholder: string;
  textSecure: boolean;
  label: string;
  errorMsgBase: string;
  onChangeText: (text: string) => void;

  setCanSubmit: (error: boolean) => void;
};
