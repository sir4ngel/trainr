import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { CredentialsContext } from './src/utils/context/CredentialsContext';
import RootStack from './src/navigation/stacks/RootStack';


const App = () => {
  const [appReady, setappReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkCredentials = () => {
    try {
      AsyncStorage.getItem('credentials').then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
          setappReady(true);
        } else {
          setStoredCredentials(null);
        }
      }).catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  if (!appReady) {
    checkCredentials();
  }
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <RootStack />
      </CredentialsContext.Provider>
  );
}

export default App;