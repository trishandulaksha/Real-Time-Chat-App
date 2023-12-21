import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import MainScreen from '../screens/MainScreen/MainScreen/MainScreen';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import LoginScreen from '../screens/MainScreen/LoginScreen/LoginScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import {
  ResetPasswordScreen,
  OTPValidationUnit,
} from '../screens/MainScreen/LoginScreen/ResetPasswordScreen';
import {MyStackParamList} from '../../my-app';
// import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createStackNavigator<MyStackParamList>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        <Stack.Screen name="main" component={MainScreen} />

        <Stack.Screen name="loginscreen" component={LoginScreen} />
        <Stack.Screen
          name="resetpasswordscreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="otpvalidationscreen"
          component={OTPValidationUnit}
        />
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="profilescreen" component={ProfileScreen} />
        <Stack.Screen name="chatscreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
