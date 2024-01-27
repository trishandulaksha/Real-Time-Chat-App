import {Text, View} from 'react-native';
import React from 'react';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../my-app';
import {signoutController} from '../../utils/auth/signout';

const MoreScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const signoutHandle = () => {
    signoutController(navigation);
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <Text>More Screen</Text>
        <View>
          <Text onPress={signoutHandle}>Sign Out</Text>
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
};

export default MoreScreen;
