import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'RegistrosDatabase.db' });

const Registros = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [newId, setNewId] = useState({
    id: '',
    saved: false,  
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM table_register', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      setList(temp);
    });
  });  
  
  useEffect(() => {
    if(newId.saved){
      db.transaction((tx)=> {
        tx.executeSql(
          'UPDATE table_register set register_identificador=? where register_id=?',
          [newId.id, updateId],
          (tx, results) => {
            console.log('Results',results.rowsAffected);
            if(results.rowsAffected>0){
              Alert.alert( 'Successo', 'O registro foi atualizado',
                [
                  {text: 'Ok', onPress: () => setOpen(false)},
                ],
                { cancelable: false }
              );
            }else{
              Alert.alert('Falha na atualização');
            }
          }
        );
      });              
    }
  }, [newId])  

  useEffect(() => {
    if(deleteId){
      console.log('entrei')
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  table_register where register_id=?',
          [deleteId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Successo',
                'O registro foi excluído',
                [
                  {
                    text: 'Ok',
                    onPress: () => setUpdateId(null),
                  },
                ],
                { cancelable: false }
              );
            } else {
              Alert.alert('Falha na remoção');
            }
          }
        );
      });      
    }
  }, [deleteId])
  
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
            <View style={styles.registerButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => { 
                                                                    setUpdateId(item.register_id)
                                                                    setOpen(true)                                      
                                                                  }}
              >
                <Icon1 name='edit' size={23} color='#000'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                                                      setDeleteId(item.register_id)
                                                                    }}
              >
                <Icon2 name='delete' size={23} color='#000'/>
              </TouchableOpacity>              
            </View>
          </View>
        )}        
      />

      { open && 
        <Modal
          animationType='slide'
          transparent={false}
          visible={open}
        >
          <View style={styles.updateContainer}>
            <TextInput 
              style={styles.input}
              onChangeText={(texto) => setNewId({
                                        id: texto,
                                        saved: false
                                       })
              }
              value={newId.id}
              placeholder='Novo identificador'
            />
            <TouchableOpacity style={styles.updateButton} onPress={() => {
                                                                    setNewId({
                                                                      id: newId.id,
                                                                      saved: true,
                                                                    })}}
            >
              <Text style={styles.updateText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={() => { setOpen(false) }}>
              <Text style={styles.updateText}>Cancelar</Text>
            </TouchableOpacity>            
          </View>
        </Modal>
      }   
        
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
  },
  registerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    marginRight: 20
  },
  updateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#21243D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    backgroundColor: '#FAFAFA',
    fontSize: 20,    
  },
  updateButton: {
    backgroundColor: '#21243D',
    borderRadius: 20,
    height: 45,
    width: '80%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  updateText: {
    fontWeight: 'bold',
    color: '#FFF'    
  }  
});

export default Registros;