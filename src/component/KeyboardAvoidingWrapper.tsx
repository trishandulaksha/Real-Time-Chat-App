import {
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {ReactNode} from 'react';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
}

const KeyboardAvoidingWrapper: React.FC<KeyboardAvoidingWrapperProps> = ({
  children,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingWrapper;
