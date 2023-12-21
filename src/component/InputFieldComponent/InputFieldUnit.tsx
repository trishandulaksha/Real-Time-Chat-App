import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';

import {inputTypeProp} from '../../../my-app';
import {emailValidator} from '../../utils/UserDataValidation/emailValidator';
import {userNameValidator} from '../../utils/UserDataValidation/userNameValidate';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '../../utils/UserDataValidation/passwordValidate';

const InputFieldUnit = ({
  placeholder,
  textSecure,
  label,
  errorMsgBase,
  onChangeText,
  setCanSubmit,
}: inputTypeProp) => {
  const [inputValue, setInputValue] = useState('');
  const [errMsg, setErrMsg] = useState<string[]>([]);
  const [err, setErr] = useState<boolean>(false);

  const handleBlur = () => {
    if (errorMsgBase === 'User_Name') {
      userNameValidator(inputValue, setErrMsg, setErr, setCanSubmit);
    } else if (errorMsgBase === 'Email') {
      emailValidator(inputValue, setErrMsg, setErr, setCanSubmit);
    } else if (errorMsgBase === 'Password') {
      passwordValidator(inputValue, setErrMsg, setErr, setCanSubmit);
    } else if (errorMsgBase === 'Confirm_Password') {
      confirmPasswordValidator(inputValue, setErrMsg, setErr, setCanSubmit);
    }
  };
  return (
    <View className="p-1 mt-4 mx-11 ">
      <View className="border rounded-lg ">
        <Text className="absolute ml-2 -mt-3 font-bold bg-white">{label}</Text>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={textSecure}
          className="p-1 ml-3"
          onBlur={handleBlur}
          onChangeText={(text: string) => {
            setInputValue(text);
            onChangeText(text);
            if (err) {
              setErr(false);
            }
            setCanSubmit(false);
          }}
        />
      </View>
      {err &&
        (errorMsgBase === 'Password' ? (
          <View>
            {errMsg.map((errmsg, index) => (
              <Text key={index} className="ml-2 font-bold text-red-600">
                {errmsg}
              </Text>
            ))}
          </View>
        ) : (
          <Text className="ml-2 font-bold text-red-600">
            {errMsg?.join(',')}
          </Text>
        ))}
    </View>
  );
};
export default InputFieldUnit;
