import React, { useEffect } from 'react';
import { View, 
         Text, 
         TouchableOpacity, 
         StyleSheet } from 'react-native';
import { createTable } from './../../DataBase';

const Home = ({ navigation }) => {
  useEffect(() => {
    createTable();
  }, []);

  function navigateToNovo(){
    navigation.navigate('Novo');
  } 
  function navigateToRegistros(){
    navigation.navigate('Registros');
  } 
  
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
          Project
          <Text style={{color: '#1076F7'}}>Name</Text>
        </Text>
      <TouchableOpacity style={styles.homeButton} onPress={navigateToNovo}>
        <Text style={styles.buttonText}>Novo Registro</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.homeButton} onPress={navigateToRegistros}>
        <Text style={styles.buttonText}>Registros</Text>
      </TouchableOpacity>   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#21243D',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 180
  },
  homeButton: {
    backgroundColor: '#21243D',
    borderRadius: 20,
    height: 45,
    width: '80%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
})

export default Home;