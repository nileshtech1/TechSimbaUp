import React, { useEffect } from 'react'
import MainRoute from './src/Route/MainRoute'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '673321995572-8fvtd3se8fbve6gvqnvrb9arrabl049o.apps.googleusercontent.com', // From Firebase console
      offlineAccess: true,
      forceRefresh: true,
    });
  }, []);
  
  return (
    <MainRoute/>
  )
}

export default App