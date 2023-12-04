import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView } from 'react-native';

// import the screens
import Screen1 from './components/Start';
import Screen2 from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// initialize connection to Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// NetInfo for Detecting a Network Connection
import { useNetInfo } from '@react-native-community/netinfo';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const [text, setText] = useState('');

  // My web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDMznrUGxVuavM9ZWarOlue2-n25p9SDrc",
    authDomain: "chat-app-4e65a.firebaseapp.com",
    projectId: "chat-app-4e65a",
    storageBucket: "chat-app-4e65a.appspot.com",
    messagingSenderId: "254641003347",
    appId: "1:254641003347:web:5ae7d8d2a11ac6a9c71fa6"
  };

  //connection status
  const connectionStatus = useNetInfo();

  //if user is not connected to the internet, disable trying to connect to the database
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app); 

  // alert the user input (`text` state's value)
  const alertMyText = () => {
  Alert.alert(text);
  }

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Start" component={Screen1}></Stack.Screen>
        <Stack.Screen name="Screen2">
          {(props) => (
            <Screen2
              db={db}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;


