import firestore from '@react-native-firebase/firestore';
import socket from '../socketio/socketService';

const MessageService = {
  sendMessage: async (
    contactId: string,
    message: string,
    currentUser: string,
  ) => {
    try {
      console.log(contactId, message);
      const timeStamp = firestore.FieldValue.serverTimestamp();

      await firestore()
        .collection('messages')
        .doc(currentUser)
        .collection('chat')
        .doc(contactId)
        .collection('conversations')
        .add({
          sender: currentUser,
          text: message,
          createdAt: timeStamp,
          status: 1,
        });

      socket.emit('newMessage', {
        contactId,
        sender: currentUser,
        message,
      });
    } catch (error) {
      console.error('Error Sending Message', error);
    }
  },

  listenForMessage: (
    contactId: string,
    callback: (messages: any[]) => void,
    currentUser: string,
  ) => {
    const currentUserCollectionRef = firestore()
      .collection('messages')
      .doc(currentUser)
      .collection('chat')
      .doc(contactId)
      .collection('conversations')
      .orderBy('createdAt', 'asc');

    const contactUserCollectionRef = firestore()
      .collection('messages')
      .doc(contactId)
      .collection('chat')
      .doc(currentUser)
      .collection('conversations')
      .orderBy('createdAt', 'asc');

    let currentUserMessages: any[] = [];
    let contactUserMessages: any[] = [];

    const allMessages = (currentUserChats: any[], contactUserChats: any[]) => {
      const sortedCoversation = [...currentUserChats, ...contactUserChats].sort(
        (a, b) => {
          const aTimestamp = a.createdAt ? a.createdAt.toMillis() : 0;
          const bTimestamp = b.createdAt ? b.createdAt.toMillis() : 0;

          return aTimestamp - bTimestamp;
        },
      );

      callback(sortedCoversation);
    };

    const currentUserUnsubscribe = currentUserCollectionRef.onSnapshot(
      currentUserSnapshot => {
        currentUserMessages = currentUserSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        allMessages(currentUserMessages, contactUserMessages);
      },
    );

    const contactUserUnsubscribe = contactUserCollectionRef.onSnapshot(
      contactUserSnapshot => {
        contactUserMessages = contactUserSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        allMessages(currentUserMessages, contactUserMessages);
      },
    );

    const unsubscribe = () => {
      currentUserUnsubscribe();
      contactUserUnsubscribe();
    };

    return unsubscribe;
  },
};

export default MessageService;
