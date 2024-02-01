import React, {useContext} from 'react';
import {Modal, Text, View} from 'react-native';
import {NotificationData} from '../../../context/chatContext';

const NotificationModel = () => {
  const {notifications} = useContext(NotificationData);
  console.log(notifications);

  return (
    <>
      <Modal visible={true} animationType="slide" transparent={true}>
        <View>
          {notifications.map(notificationData => (
            <View key={notificationData.id}>
              <Text>{notificationData.sender}</Text>
              <Text>{notificationData.text}</Text>
            </View>
          ))}
        </View>
      </Modal>
    </>
  );
};

export default NotificationModel;
