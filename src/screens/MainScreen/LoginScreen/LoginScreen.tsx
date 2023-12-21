import React, {useEffect, useState} from 'react';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import KeyboardAvoidingWrapper from '../../../component/KeyboardAvoidingWrapper';
import InputFieldUnit from '../../../component/InputFieldComponent/InputFieldUnit';

// import {Link} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../../my-app';

import {loginController} from '../../../utils/auth/login';
import {signUpController} from '../../../utils/auth/signup';
import SplashScreen from '../../SplashScreen/SplashScreen';

const LoginScreen = () => {
  const [checkScreen, setCheckScreen] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  let [showSplash, setShowSplash] = useState(false);

  return (
    <>
      <View className="h-full bg-white">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <KeyboardAvoidingWrapper>
            <View>
              {checkScreen ? (
                <RegisterScreenUnit
                  setCheckScreen={setCheckScreen}
                  setShowSplash={setShowSplash}
                />
              ) : (
                <LoginScreenUnit setShowSplash={setShowSplash} />
              )}
            </View>
            <View className="items-center justify-center">
              {!checkScreen ? (
                <View>
                  <Text className="text-black">
                    Create new Account{' '}
                    <Text
                      onPress={() => {
                        setCheckScreen(true);
                      }}
                      className="font-bold text-blue-800">
                      Sign Up
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('resetpasswordscreen');
                    }}>
                    <Text className="mt-2 font-semibold text-center text-blue-800">
                      Forget password ?
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text className="text-black">
                  Already have an account{' '}
                  <Text
                    onPress={() => {
                      setCheckScreen(false);
                    }}
                    className="font-bold text-blue-800">
                    Sign in
                  </Text>
                </Text>
              )}
            </View>
          </KeyboardAvoidingWrapper>
        )}
      </View>
    </>
  );
};

export default LoginScreen;

// REGISTRATION UNIT

export const RegisterScreenUnit: React.FC<{
  setCheckScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setCheckScreen, setShowSplash}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  console.log('registration rerender check');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dbResponse, setDbResponse] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const registerHandle = () => {
    if (userName && email && password && confirmPassword && !canSubmit) {
      console.log('register function called');
      let signUpData = {
        userName,
        email,
        password,
        confirmPassword,
        setDbResponse,
        setCheckScreen,
        setShowSplash,
        navigation,
      };
      signUpController(signUpData);
    } else {
      Alert.alert('All Fields are required');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDbResponse('');
    }, 3000);

    // Clear the timeout when the component unmounts or when the effect is re-run
    return () => clearTimeout(timeoutId);
  }, [dbResponse]);
  return (
    <>
      <View className="flex-1">
        <View className="mt-3">
          <Text className="mb-0 font-serif font-extrabold text-center text-blue-900 shadow-2xl text-7xl">
            TChat
          </Text>
        </View>

        {dbResponse ? (
          <View className="ml-auto mr-auto">
            <Text style={{color: 'red', fontWeight: 'bold'}}>{dbResponse}</Text>
          </View>
        ) : null}

        <View className="p-0 mt-2 ml-auto mr-auto ">
          <TouchableOpacity className="p-0 m-0 mt-auto mb-auto ">
            <Image
              source={require('../../../asstes/images/profileImg.png')}
              className="w-40 h-40"
            />
            <Icon
              name={'plus'}
              size={40}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                marginRight: 5,
                marginBottom: 12,
                fontWeight: 'bold',
                color: 'black',
              }}
            />
          </TouchableOpacity>
        </View>

        <View>
          <InputFieldUnit
            onChangeText={setUserName}
            placeholder="User Name"
            textSecure={false}
            label="User Name"
            errorMsgBase="User_Name"
            setCanSubmit={setCanSubmit}
          />
          <InputFieldUnit
            onChangeText={setEmail}
            placeholder="Email"
            textSecure={false}
            label="Email"
            errorMsgBase="Email"
            setCanSubmit={setCanSubmit}
          />
          <InputFieldUnit
            onChangeText={setPassword}
            placeholder="Password"
            textSecure={true}
            label="Password"
            errorMsgBase="Password"
            setCanSubmit={setCanSubmit}
          />
          <InputFieldUnit
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            textSecure={true}
            label="Confirm Password"
            errorMsgBase="Confirm_Password"
            setCanSubmit={setCanSubmit}
          />
        </View>
        <View className="items-center justify-center mt-auto mb-5 pt-7 ">
          <View className="items-center ">
            <TouchableOpacity
              className="bg-blue-800 rounded-3xl "
              onPress={registerHandle}>
              <Text className="py-3 text-white px-28">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

// LOGIN SCREEN UNIT
export const LoginScreenUnit: React.FC<{
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setShowSplash}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dbResponse, setDbResponse] = useState('');

  const [canSubmit, setCanSubmit] = useState(false);

  const loginHandle = () => {
    if (email && password && !canSubmit) {
      let signinData = {
        email,
        password,
        setDbResponse,
        setShowSplash,
        navigation,
      };
      loginController(signinData);
    } else {
      Alert.alert('All fields are required');
      setDbResponse('All fields are required');
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDbResponse('');
    }, 3000);

    // Clear the timeout when the component unmounts or when the effect is re-run
    return () => clearTimeout(timeoutId);
  }, [dbResponse]);
  return (
    <>
      <View className="flex-1">
        <View className="mt-32">
          <Text className="font-serif font-extrabold text-center text-blue-900 shadow-2xl mb-7 text-7xl">
            TChat
          </Text>
        </View>
        {dbResponse ? (
          <View className="ml-auto mr-auto">
            <Text style={{color: 'red', fontWeight: 'bold'}}>{dbResponse}</Text>
          </View>
        ) : null}
        <View className="justify-center item-center">
          <View>
            <InputFieldUnit
              onChangeText={setEmail}
              placeholder="Email"
              textSecure={false}
              label="Email"
              errorMsgBase="Email"
              setCanSubmit={setCanSubmit}
            />
            <InputFieldUnit
              onChangeText={setPassword}
              placeholder="Password"
              textSecure={true}
              label="Password"
              errorMsgBase="Password"
              setCanSubmit={setCanSubmit}
            />
          </View>
          <View className="items-center justify-center mt-auto mb-5 pt-7 ">
            <View className="items-center ">
              <TouchableOpacity
                className="bg-blue-800 rounded-3xl "
                onPress={loginHandle}>
                <Text className="py-3 text-white px-28">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
