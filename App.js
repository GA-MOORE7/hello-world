import { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView } from 'react-native';

// import the screens
import Screen1 from './components/Start';
import Screen2 from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const [text, setText] = useState('');

   // alert the user input (`text` state's value)
   const alertMyText = () => {
    Alert.alert(text);
  }

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Screen1"
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;


