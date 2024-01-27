import {View} from 'react-native';
import React from 'react';

import Routes from './src/routes/routes';
import NotficationContext from './src/context/chatContext';

const App = () => {
  console.log('App component rerender check');
  return (
    <View className="flex-1">
      <NotficationContext>
        <Routes />
      </NotficationContext>
    </View>
  );
};

export default App;
