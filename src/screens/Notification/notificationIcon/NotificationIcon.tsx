import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NotificationIcon = () => {
  const [notificationLength, setNotificationLength] = useState(0);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const data = await AsyncStorage.getItem('notification');
        const parsedData = JSON.parse(data || '[]');
        setNotificationLength(parsedData.length);
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchNotificationData();
  }, []);
  return (
    <>
      <Text className="absolute -mt-2 -ml-4 font-bold text-red-600">
        {notificationLength}
      </Text>
      <Icon name="bell" size={22} style={{color: 'black'}} />
    </>
  );
};

export default NotificationIcon;
