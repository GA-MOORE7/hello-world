import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const imgBackground = require("../assets/bg-image.png");

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');
  const [background, setBackground] = useState();

  const signInUser = () => {
    
      //after user has been signed in anonymously, navigate to Chat, and pass this object to it (available there through route.params.color for ex.\)
      
        navigation.navigate("Screen2", {
          color: background,
          name: name,
        });
        
      } 

  return (
    <View style={styles.container}>

      <ImageBackground source={imgBackground} style={styles.image}>
        {/* app title: */}
        <Text style={styles.title}>Chatroom App</Text>

        {/* when typing, makes the keyboard not hide input or information that would be behind it */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "android" ? "height" : "padding"}
          keyboardVerticalOffset={Platform.OS === "android" ? 0 : 0}
        > 
        {/* container for input, color choice and button */}         
        <View style={styles.inputBox}>
        {/* username input */}
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />
        <View>
        <Text style={styles.chooseBgText}>Choose Background Color</Text>
        <View style={styles.colorButtonBox}>

           {/* color 1 */}
          <TouchableOpacity
          style={[styles.colorButton, styles.colorInput1]}
          onPress={() => {
            setBackground(styles.colorInput1.backgroundColor);
          }}>            
          </TouchableOpacity>

           {/* color 2 */}
          <TouchableOpacity
           style={[styles.colorButton, styles.colorInput2]}
           onPress={() => {
             setBackground(styles.colorInput2.backgroundColor);
           }}>
          </TouchableOpacity>

           {/* color 3 */}
          <TouchableOpacity
          style={[styles.colorButton, styles.colorInput3]}
          onPress={() => {
            setBackground(styles.colorInput3.backgroundColor);
          }}>
          </TouchableOpacity>

           {/* color 4 */}
          <TouchableOpacity
          style={[styles.colorButton, styles.colorInput4]}
          onPress={() => {
            setBackground(styles.colorInput4.backgroundColor);
          }}>
          </TouchableOpacity>          
        </View>
        </View>  

        {/* button to start chatting, links to chat.js */} 
        <TouchableOpacity 
          style={styles.button} 
          onPress={signInUser}>
          <Text>Press Here</Text>
        </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    paddingTop: 50,
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    marginBottom: 250,
  },
  inputBox: {
    flex: 1,
    height: "44%",
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: 10
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    margin: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 60,
  },
  colorButtonBox: {
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorInput1: {
    backgroundColor: "#82b1b5",
  },
  colorInput2: {
    backgroundColor: "#474056",
  },
  colorInput3: {
    backgroundColor: "#8A95A5",
  },
  colorInput4: {
    backgroundColor: "#B9C6AE",
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Screen1;