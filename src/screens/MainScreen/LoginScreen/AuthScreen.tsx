import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import KeyboardAvoidingWrapper from '../../../component/KeyboardAvoidingWrapper';
import {useNavigation} from '@react-navigation/native';
import {MyStackParamList} from '../../../asstes/types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeScreenNavigationProp} from '../../../../my-app';

type Props = NativeStackScreenProps<MyStackParamList, 'otpvalidation'>;

export const AuthScreen = () => {
  const defaultCountryCode: CountryCode = 'US';
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [clickedcountry, setClickedCountry] = useState<Country | null>(null);
  const [showCountry, setShowCountry] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setClickedCountry(country);
  };

  useEffect(() => {
    setCountryCode(defaultCountryCode);
  }, [defaultCountryCode]);

  const navigateToOTPValidation = () => {
    if (phoneNumber) {
      const userData: {countryCode: number; number: number} = {
        countryCode: Number(clickedcountry ? clickedcountry.callingCode : '1'),
        number: Number(phoneNumber),
      };
      // navigation.navigate('otpvalidation', {userData: userData});
      navigation.navigate('loginscreen');
      console.log(userData);
    }
  };
  return (
    <>
      <KeyboardAvoidingWrapper>
        <View className="relative h-full">
          <View className="relative items-center text-center mt-44">
            <Text className="text-2xl font-bold">Enter Your Phone Number</Text>
            <Text className="mx-10 mt-2 text-center">
              Please confirm your country code and enter your phone number
            </Text>
          </View>
          <View className="relative flex flex-row items-center justify-center mt-12">
            <TouchableOpacity
              className="items-center w-16 py-1 m-0 bg-slate-100"
              onPress={() => setShowCountry(!showCountry)}>
              <CountryPicker
                {...{
                  countryCode,
                  withFilter: true,
                  withFlag: true,
                  withCountryNameButton: false,
                  withAlphaFilter: false,
                  withCallingCode: false,
                  withEmoji: true,
                  onSelect,
                }}
                visible={showCountry}
              />
            </TouchableOpacity>

            <Text className="z-20 py-2 pr-1 -ml-4 text-black text-xm bg-slate-100">
              +{clickedcountry ? clickedcountry.callingCode : '1'}
            </Text>
            <TextInput
              placeholder="Phone Number"
              keyboardType="numeric"
              className="px-2 py-1 m-0 ml-2 text-black bg-slate-100 w-60"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View className="items-center justify-center pt-20 mt-auto mb-5 ">
          <View className="items-center ">
            <TouchableOpacity
              className="bg-blue-800 rounded-3xl "
              onPress={navigateToOTPValidation}>
              <Text className="py-3 text-white px-28">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export const OTPValidationScreen = ({route}: Props) => {
  const {userData} = route.params;
  return (
    <>
      <View>
        <Text>Enter Codes</Text>
        <Text>{`We have sent you an SMS with the code to ${userData.countryCode} ${userData.number}`}</Text>
      </View>
    </>
  );
};
