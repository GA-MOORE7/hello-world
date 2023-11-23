import { useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, } from 'react-native';

const Screen2 = ({ route, navigation }) => {
  const { name } = route.params;
  const color = route.params.color;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
   <View style={[styles.container, { backgroundColor: color }]}>
     <Text>Hello { name }!</Text>     
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Screen2;