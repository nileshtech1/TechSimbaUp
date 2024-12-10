import React, { useEffect } from 'react'
import MainRoute from './src/Route/MainRoute'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store/Store';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '673321995572-1pldvqc16n77nldudvr70bp7r7i5rmin.apps.googleusercontent.com', // From Firebase console
      offlineAccess: true,
      forceRefresh: true,
    });
  }, []);
  
  return (
    <Provider store={store}>
    <MainRoute/>
    </Provider>
  )
}

export default App