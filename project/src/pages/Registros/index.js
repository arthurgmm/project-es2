import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'RegistrosDatabase.db' });

const Registros = () => {
  const [list, setList] = useState([]);

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM table_register', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      setList(temp);
    });
  });  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registros</Text>
      </View>      
      <FlatList 
        data={list}
        
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View key={item.register_id} style={styles.registerContainer}>
            <Text style={styles.labelText}>Identificador: {item.register_identificador}</Text>
            <Text style={styles.labelText}>Data: {item.register_date}</Text>
            <Text style={styles.labelText}>Hora: {item.register_hour}</Text>
            <Text style={styles.labelText}>Latitude: {item.register_lat}</Text>
            <Text style={styles.labelText}>Longitude: {item.register_long}</Text>
          </View>
        )}        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#21243D',
  },
  title: {
    fontSize: 23,
    color: '#FFF',
    fontWeight: 'bold',
  },  
  registerContainer: {
    backgroundColor: '#FFF',
    borderWidth: 5,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Registros;