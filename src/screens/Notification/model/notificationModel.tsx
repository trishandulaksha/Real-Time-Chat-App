import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Modal, Text, View} from 'react-native';

const NotificationModel = () => {
  const [notificationData, setNotificationData] = useState([]);
  console.log('Notification data', notificationData);
  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const data = await AsyncStorage.getItem('notification');
        setNotificationData(JSON.parse(data || '[]'));
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchNotificationData();
  }, []);
  return (
    <>
      <Modal
        visible={notificationData.length > 0}
        animationType="slide"
        transparent={true}>
        <View>
          {notificationData.map((notification, index) => (
            <View key={index}>
              <Text>{notification.sender}</Text>
              <Text>{notification.message}</Text>
            </View>
          ))}
        </View>
      </Modal>
    </>
  );
};

export default NotificationModel;
