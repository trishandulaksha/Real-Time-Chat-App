import {View} from 'react-native';
import React, {useState} from 'react';

import ContactScreen from './ContactScreen';
import MessageScreen from './MessageScreen';
import MoreScreen from './MoreScreen';
import FooterComponent from '../../component/FooterComponent/FooterComponent';
import KeyboardAvoidingWrapper from '../../component/KeyboardAvoidingWrapper';

const HomeScreen = () => {
  const [iconText, setIconText] = useState('');
  return (
    <>
      <View className="h-full mb-3 bg-white">
        <KeyboardAvoidingWrapper>
          {iconText === 'more-horizontal' ? (
            <MoreScreen />
          ) : iconText === 'users' ? (
            <ContactScreen />
          ) : (
            <MessageScreen />
          )}

          <FooterComponent setIconText={setIconText} />
        </KeyboardAvoidingWrapper>
      </View>
    </>
  );
};

export default HomeScreen;
