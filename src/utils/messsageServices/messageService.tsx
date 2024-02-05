import firestore from '@react-native-firebase/firestore';

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
          seen: false,
        });
    } catch (error) {
      console.error('Error Sending Message', error);
    }
  },

  listenForMessage: (
    contactId: string,
    callback: (messages: any[]) => void,
    currentUser: string,
    onSeenChange: () => void,
    page: number,
  ) => {
    const currentUserCollectionRef = firestore()
      .collection('messages')
      .doc(currentUser)
      .collection('chat')
      .doc(contactId)
      .collection('conversations')
      .orderBy('createdAt', 'desc')
      .limit(page * 10);

    const contactUserCollectionRef = firestore()
      .collection('messages')
      .doc(contactId)
      .collection('chat')
      .doc(currentUser)
      .collection('conversations')
      .orderBy('createdAt', 'desc')
      .limit(page * 10);

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

    const contactUserUnsubscribe = contactUserCollectionRef.onSnapshot(
      contactUserSnapshot => {
        contactUserMessages = contactUserSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        allMessages(currentUserMessages, contactUserMessages);
      },
    );
    const currentUserUnsubscribe = currentUserCollectionRef.onSnapshot(
      currentUserSnapshot => {
        currentUserMessages = currentUserSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          seen: doc.data().seen,
        }));
        allMessages(currentUserMessages, contactUserMessages);
        onSeenChange();
      },
    );

    const unsubscribe = () => {
      currentUserUnsubscribe();
      contactUserUnsubscribe();
    };

    return unsubscribe;
  },
  getUnseenMessages: async (currentUser: string, contactId: string) => {
    try {
      const messageRef = firestore()
        .collection('messages')
        .doc(currentUser)
        .collection('chat')
        .doc(contactId)
        .collection('conversations');

      const unseenMessages = await messageRef.where('seen', '==', false).get();
      const unseenMessagesData = unseenMessages.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        sender: doc.data().sender,
        receiver: contactId,
        message: doc.data().text,
      }));

      return unseenMessagesData;
    } catch (error) {
      console.error('Error fetching unseen messages:', error);
      throw error;
    }
  },
  markMessageAsSeen: async (currentUser: string, contactId: string) => {
    try {
      const messageRef = firestore()
        .collection('messages')
        .doc(currentUser)
        .collection('chat')
        .doc(contactId)
        .collection('conversations');

      const unSeenMessage = await messageRef.where('seen', '==', false).get();

      unSeenMessage.forEach(async doc => {
        await doc.ref.update({seen: true});
      });
    } catch (error) {
      console.error('Error updating seen status:', error);
    }
  },
};

export default MessageService;
