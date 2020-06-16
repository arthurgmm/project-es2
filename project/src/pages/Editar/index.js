import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateRegister } from './../../DataBase';

const Editar = ({ navigation, route }) => {
  const { updateId } = route.params;
  const [newId, setNewId] = useState({
    id: '',
    saved: false,  
  });

  useEffect(() => {
    if(newId.saved){
      updateRegister(newId.id,updateId);
      navigation.navigate('Registros');             
    }
  }, [newId])  

  return (
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
  )
}

const styles = StyleSheet.create({
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
})

export default Editar;