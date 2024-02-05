import React, {createContext, useState} from 'react';

export interface NotificationContextProps {
  notifications: {id: string; userName: string; unseenMessages: string[]}[];
  setNotification: React.Dispatch<
    React.SetStateAction<
      {id: string; userName: string; unseenMessages: string[]}[]
    >
  >;
}
export interface NewMessageContextProps {
  newMessage: string[];
  setNewMessage: React.Dispatch<React.SetStateAction<string[]>>;
}

export const NotificationData = createContext<NotificationContextProps>({
  notifications: [],
  setNotification: () => {},
});

export const NewMessage = createContext<NewMessageContextProps>({
  newMessage: [],
  setNewMessage: () => {},
});

const NotficationContext: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [notifications, setNotification] = useState<
    {id: string; userName: string; unseenMessages: string[]}[]
  >([]);
  const [newMessage, setNewMessage] = useState<string[]>([]);

  return (
    <NotificationData.Provider value={{notifications, setNotification}}>
      <NewMessage.Provider value={{newMessage, setNewMessage}}>
        {children}
      </NewMessage.Provider>
    </NotificationData.Provider>
  );
};

export default NotficationContext;
