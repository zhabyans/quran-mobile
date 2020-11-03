import React from 'react';
import Welcome from './QuranApp/src/';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import store from './QuranApp/src/redux/store'
import { Provider } from 'react-redux';


const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle='dark-content' backgroundColor='white' />
        <Welcome />
      </Provider>
    </>
  );
};

export default App;
