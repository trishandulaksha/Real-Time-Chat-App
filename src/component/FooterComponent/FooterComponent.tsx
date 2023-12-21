import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';

// import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';

const footerData = [
  {
    icon: 'users',
    label: 'Contacts',
  },
  {
    icon: 'message-circle',
    label: 'Message',
  },
  {
    icon: 'more-horizontal',
    label: 'More',
  },
];

interface FooterComponentProps {
  setIconText: (iconText: string) => void;
}

const FooterComponent: React.FC<FooterComponentProps> = ({setIconText}) => {
  const [clickIcon, setClickIcon] = useState(false);
  const [clickIconText, setClickIconText] = useState('');

  const clickedIconHandle = (icontext: string) => {
    setClickIcon(true);
    setIconText(icontext);
    setClickIconText(icontext);
  };

  return (
    <>
      <View className="left-0 right-0 flex flex-row justify-between mx-4 my-4 mt-auto ">
        {footerData.map(({icon, label}, index) => (
          <TouchableOpacity
            onPress={() => {
              clickedIconHandle(icon);
            }}
            key={index}>
            <View className="justify-center px-3 py-3 item-center">
              {clickIcon && icon === clickIconText ? (
                <View>
                  <Text className="text-black ">{label}</Text>
                  <Text className="-mt-4 text-2xl font-extrabold text-center text-black">
                    .
                  </Text>
                </View>
              ) : (
                <Icon
                  name={icon}
                  size={25}
                  style={{
                    textAlign: 'center',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default FooterComponent;
