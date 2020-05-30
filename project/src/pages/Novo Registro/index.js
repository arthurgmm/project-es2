import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      },
      (error) => alert(error.message),
      { enableHighAccuracy: false, timeout: 5000 }
    );  
  }, []);

  function navigateToVideo(){
    navigation.navigate('Video');
  }    

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
          <TextInput 
            style={styles.input}
            value={date}
            editable={false}
          />
          <TextInput 
            style={styles.input}
            value={hour}
            editable={false}
          />
          <TextInput 
            style={styles.input}
            value={`${latitude} (Latitude)`}
            editable={false}
          /> 
          <TextInput 
            style={styles.input}
            value={`${longitude} (Longitude)`}
            editable={false}
          />                                    
          <View style={styles.registroButtons}>
            <TouchableOpacity onPress={navigateToVideo}>
              <Icon name='video-camera' size={40} color='#000'/>
            </TouchableOpacity> 
            <TouchableOpacity>
              <Icon name='microphone' size={40} color='#000'/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name='check' size={40} color='#000'/>
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
    backgroundColor: '#FF7C7C',
  },
  title: {
    fontSize: 23,
    color: '#FFF',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
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
    marginBottom: 20,
    fontSize: 20,    
  },
  registroButtons: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',   
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },
});

export default NovoRegistro;