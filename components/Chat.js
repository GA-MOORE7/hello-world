 //imports
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar  } from "react-native-gifted-chat";
import { collection, orderBy, query, getDocs, addDoc, onSnapshot, disableNetwork, enableNetwork } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

// main

const Screen2 = ({ route, navigation, db, isConnected, storage }) => {

// states

  const { name } = route.params;
  const color = route.params.color;
  const { userID } = route.params;
  const [messages, setMessages] = useState([]);

// functions

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  let message;

  // Title for the screen
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      enableNetwork(db);
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      message = onSnapshot(q,
        async (documentSnapshot) => {
          let newMessages = [];
          documentSnapshot.forEach(doc => {
            newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        })
    }
    else {
      loadCachedMessages();
    }
    return () => {
      if (message) message();
    }
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#dd6e74"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  // Function in order to hide input and send button for the chat when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

   const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Function to load messages from cashe if there is no connection
  const loadCachedMessages = async () => {
    const cashedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cashedMessages));
  }

  // Function to save messages into cashe when connection in on
  const cacheMessages = async (messagestoCash) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagestoCash));
    } catch (error) {
      console.log(error.message);
    }
  }

// return

 return (
   <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      user={{
        _id: userID,
          name: name
      }}
    />
    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}     
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Screen2;