import React, {useContext, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {NotificationData} from '../../../context/chatContext';
import NotificationModel from '../model/notificationModel';

const NotificationIcon = () => {
  const {notifications} = useContext(NotificationData);
  const [showNotificationModel, setShowNotificationModel] = useState(false);

  const totalUnseenNotifications = notifications.reduce(
    (total, notificationsData) =>
      total + notificationsData.unseenMessages.length,
    0,
  );
  // console.log('NotiticationIcon show notitifcation', notifications);
  const handleNotificationClick = () => {
    setShowNotificationModel(true);
  };

  const closeNotificationModel = () => {
    setShowNotificationModel(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleNotificationClick}>
        <Text className="absolute -mt-2 -ml-4 font-bold text-red-600">
          {totalUnseenNotifications}
        </Text>
        <Icon name="bell" size={22} style={{color: 'black'}} />
      </TouchableOpacity>

      <View className="absolute">
        <NotificationModel
          visible={showNotificationModel}
          onClose={closeNotificationModel}
          notifications={notifications}
        />
      </View>
    </>
  );
};

export default NotificationIcon;
