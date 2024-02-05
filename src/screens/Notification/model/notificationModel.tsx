import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface NotificationModelProps {
  visible: boolean;
  onClose: () => void;
  notifications: any[];
}
const NotificationModel: React.FC<NotificationModelProps> = ({
  visible,
  onClose,
  notifications,
}) => {
  return (
    <SafeAreaView>
      <Modal visible={visible} animationType="slide" transparent={false}>
        <View style={{marginTop: 4}}>
          <TouchableOpacity style={{marginLeft: 5}} onPress={onClose}>
            <Text
              style={{
                padding: 10,
                backgroundColor: 'slategray',
                color: 'white',
                width: 100,
                textAlign: 'center',
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="mt-12 ml-6">
            {notifications.length > 0 ? (
              notifications.map(notificationData => (
                <View key={notificationData.id}>
                  {notificationData.unseenMessages.length > 0 && (
                    <>
                      <Text className="mt-2 text-xl font-bold">{`${notificationData.userName}`}</Text>
                      {notificationData.unseenMessages.map(
                        (message: string, index: string) => (
                          <Text key={index} className="ml-4">
                            {message}
                          </Text>
                        ),
                      )}
                    </>
                  )}
                </View>
              ))
            ) : (
              <Text>No notifications</Text>
            )}
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default NotificationModel;
