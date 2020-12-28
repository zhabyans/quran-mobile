import React from 'react';
import Welcome from './router';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import store from './redux/store';
import {Provider} from 'react-redux';
import {Loading} from './components';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Welcome />
        {/* <Loading /> */}
      </Provider>
    </>
  );
};

export default App;
