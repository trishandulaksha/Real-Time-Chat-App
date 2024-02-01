import {Text} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {NotificationData} from '../../../context/chatContext';

const NotificationIcon = () => {
  const {notifications} = useContext(NotificationData);
  console.log('notifications data', notifications);
  return (
    <>
      <Text className="absolute -mt-2 -ml-4 font-bold text-red-600">
        {notifications.length}
      </Text>
      <Icon name="bell" size={22} style={{color: 'black'}} />
    </>
  );
};

export default NotificationIcon;
