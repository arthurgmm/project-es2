import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'RegistrosDatabase.db' });

const Home = ({ navigation }) => {

  db.transaction(function(txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_register'",
      [],
      function(tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_register', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_register(register_id INTEGER PRIMARY KEY AUTOINCREMENT, register_identificador VARCHAR(100), register_date VARCHAR(100), register_hour VARCHAR(100), register_lat VARCHAR(100), register_long VARCHAR(100))',
            []
          );
        }
      }
    );
  });

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