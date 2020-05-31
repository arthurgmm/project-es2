import React, { useState, useEffect } from 'react';
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

  function ListViewItemSeparator(){
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );    
  }
  
  return (
    <View>
      <FlatList 
        data={list}
        ItemSeparatorComponent={ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View key={item.register_id} style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Identificador: {item.register_identificador}</Text>
            <Text>Data: {item.register_date}</Text>
            <Text>Hora: {item.register_hour}</Text>
            <Text>Latitude: {item.register_lat}</Text>
            <Text>Longitude: {item.register_long}</Text>
          </View>
        )}        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Registros;