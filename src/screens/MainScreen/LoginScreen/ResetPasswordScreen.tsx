import {View, Text, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp, MyStackParamList} from '../../../../my-app';
import KeyboardAvoidingWrapper from '../../../component/KeyboardAvoidingWrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InputFieldUnit from '../../../component/InputFieldComponent/InputFieldUnit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<MyStackParamList, 'otpvalidationscreen'>;

export const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToOTPValidation = async () => {
    if (canSubmit && !email) {
      Alert.alert('Please enter valid email address');
      return;
    }

    try {
      const userDoc = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (userDoc.empty) {
        Alert.alert('User with this email does not exist');
        return;
      }

      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password reset email sent successfully');
      navigation.navigate('loginscreen');
    } catch (error) {
      Alert.alert('Error checking user email. Please try again.');
    }
  };
  return (
    <>
      <View className="flex-1 h-full bg-white">
        <View className="mt-9">
          <Text className="mb-0 font-serif font-extrabold text-center text-blue-900 shadow-2xl text-7xl">
            TChat
          </Text>
        </View>

        <KeyboardAvoidingWrapper>
          <View className="mt-24">
            <View className="items-center text-center">
              <Text className="text-2xl font-bold">
                Enter Your Email Address
              </Text>
              <Text className="mx-10 mt-4 mb-10 text-center">
                We will send you one time code on your email address
              </Text>
            </View>

            <InputFieldUnit
              onChangeText={setEmail}
              placeholder="Email"
              textSecure={false}
              label="Email"
              errorMsgBase="Email"
              setCanSubmit={setCanSubmit}
            />
          </View>

          <View className="items-center justify-center mt-auto mb-5 ">
            <View className="items-center mt-10 ">
              <TouchableOpacity
                className="bg-blue-800 rounded-3xl "
                onPress={navigateToOTPValidation}>
                <Text className="py-3 font-bold text-white px-28">GET OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingWrapper>
      </View>
    </>
  );
};

export const OTPValidationUnit = ({route}: Props) => {
  const {email} = route.params;
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  console.log('userData', email);
  const handleOtpChange = (index: number, value: string) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);
  };
  return (
    <>
      <View className="h-full felx-1 ">
        <KeyboardAvoidingWrapper>
          <View className="mt-9">
            <Text className="mb-0 font-serif font-extrabold text-center text-blue-900 shadow-2xl text-7xl">
              TChat
            </Text>
          </View>
          <View className="mt-9">
            <Text className="text-2xl font-bold text-center text-gray-800">
              Verification
            </Text>
            <Text className="mt-4 text-center">
              {' '}
              {`You will get a OTP via ${email} `}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center mt-8 ml-auto mr-auto">
            {otpValues.map((value, index) => (
              <View
                key={index}
                className="w-10 h-16 p-0 m-0 mx-4 border rounded-lg ">
                <TextInput
                  value={value}
                  className="p-2 text-4xl font-bold text-center text-blue-800 "
                  onChangeText={text => handleOtpChange(index, text)}
                  maxLength={1}
                  keyboardType="numeric"
                />
              </View>
            ))}
          </View>
          <View className="items-center justify-center mt-auto mb-5 ">
            <View className="items-center mt-10 ">
              <TouchableOpacity className="bg-blue-800 rounded-3xl ">
                <Text className="py-3 font-bold text-white px-28">VERIFY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingWrapper>
      </View>
    </>
  );
};
