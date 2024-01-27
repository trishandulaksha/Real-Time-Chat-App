import React, {createContext, useState} from 'react';

export const NotificationData = createContext([]);

const NotficationContext: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [notifications, setNotification] = useState([]);

  return (
    <NotificationData.Provider value={{notifications, setNotification}}>
      {children}
    </NotificationData.Provider>
  );
};

export default NotficationContext;
