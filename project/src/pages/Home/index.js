import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  function navigateToNovo(){
    navigation.navigate('Novo');
  }  
  
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          X9
          <Text style={{color: '#1076F7'}}>App</Text>
        </Text>
      <TouchableOpacity style={styles.homeButton} onPress={navigateToNovo}>
        <Text style={styles.buttonText}>Novo Registro</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.homeButton}>
        <Text style={styles.buttonText}>Registros</Text>
      </TouchableOpacity>   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#21243D',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 180
  },
  homeButton: {
    backgroundColor: '#FF7C7C',
    borderRadius: 20,
    height: 45,
    width: '80%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF'
  }
})

export default Home;