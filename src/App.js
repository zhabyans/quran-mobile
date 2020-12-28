import React from 'react';
import Welcome from './router';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import store from './redux/store';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';

const MainApp = () => {
  const {isLoading} = useSelector((state) => state.globalReducer);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Welcome />
      {isLoading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </>
  );
};

export default App;
