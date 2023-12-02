import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, orderBy, query, getDocs, addDoc, onSnapshot } from "firebase/firestore";

const Screen2 = ({ route, navigation, db }) => {
  const { name } = route.params;
  const color = route.params.color;
  const { userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
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

 return (
   <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
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