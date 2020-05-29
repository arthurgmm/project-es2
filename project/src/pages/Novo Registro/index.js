import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const NovoRegistro = ({ navigation }) => {
  const [date, setDate] = useState(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)
  const [hour, setHour] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
  const [latitude, setLatitude] = useState('Buscando...');
  const [longitude, setLongitude] = useState('Buscando...');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setLatitude(JSON.stringify(pos.coords.latitude))
        setLongitude(JSON.stringify(pos.coords.longitude))
      }
    );  
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Novo Registro</Text>
        </View>
        <View style={styles.body}>
          <TextInput 
            style={styles.input}
            placeholder='Identificador'
          />
          <Text>Data: {date}</Text>
          <Text>Hora: {hour}</Text>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          <View style={styles.registroButton}>
            <TouchableOpacity style={styles.videoButton}>
              <Text style={styles.videoText}>Vídeo</Text>
            </TouchableOpacity>             
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#7159C1',
  },
  title: {
    fontSize: 23,
    color: '#FFF',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#21243D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    fontSize: 20,    
  },
  registroButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  videoButton: {
    backgroundColor: '#7159C1',
    width: '30%',
    height: 45,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  videoText: {
    color: '#FFF'
  }
});

export default NovoRegistro;