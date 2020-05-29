import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          X9
          <Text style={{color: '#1076F7'}}>App</Text>
        </Text>
      <TouchableOpacity style={styles.homeButton}>
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
    fontSize: 50,
    marginBottom: 130
  },
  homeButton: {
    backgroundColor: '#7159C1',
    width: '80%',
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  buttonText: {
    color: '#FFF'
  }
})

export default Home;