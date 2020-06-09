import React, { useState, useEffect } from 'react';
import { View, 
         Text, 
         TextInput, 
         TouchableOpacity, 
         TouchableWithoutFeedback,
         Keyboard, 
         Alert, 
         StyleSheet 
        } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'RegistrosDatabase.db' });

const NovoRegistro = ({ navigation }) => {
  const [date, setDate] = useState(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`)
  const [hour, setHour] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
  const [latitude, setLatitude] = useState('Buscando...');
  const [longitude, setLongitude] = useState('Buscando...');
  const [id, setId] = useState('');

  const [registro, setRegistro] = useState({
    identificador: id,
    data: date,
    hora: hour,
    latitude: latitude,
    longitude: longitude,
    saved: false,  
  });

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

  useEffect(() => {
    if(registro.saved){
      db.transaction(function(tx) {
        tx.executeSql(
          'INSERT INTO table_register (register_identificador, register_date, register_hour, register_lat, register_long) VALUES (?,?,?,?,?)',
          [id, date, hour, latitude, longitude],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Successo',
                'Registro feito com sucesso',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      navigation.navigate('Home'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Falha no registro');
            }
          }
        );
      });          
    }
  }, [registro])

  function navigateToVideo(){
    navigation.navigate('Video', {
      id,
      date,
      hour,
      latitude,
      longitude
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Novo Registro</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.registroInput}>
            <TextInput 
              style={styles.input}
              onChangeText={(texto) => setId(texto)}
              value={id}
              placeholder='Identificador'
            />
          </View>   
          <View style={styles.registroInfos}>
            <Text style={styles.infosText}>
              <Text style={{fontWeight: 'bold'}}>Data:</Text> {date}
            </Text>
            <Text style={styles.infosText}>
              <Text style={{fontWeight: 'bold'}}>Hora:</Text> {hour}
            </Text>
            <Text style={styles.infosText}>
              <Text style={{fontWeight: 'bold'}}>Latitude:</Text> {latitude}
            </Text>
            <Text style={styles.infosText}>
              <Text style={{fontWeight: 'bold'}}>Longitude:</Text> {longitude}
            </Text>
          </View>                                 
          <View style={styles.registroButtons}>
            <TouchableOpacity style={styles.buttons} 
                              onPress={navigateToVideo}
            >
              <Icon 
                name='video-camera' 
                size={30} color='#FFF'
                style={styles.icon}
              />
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => {
                                              setRegistro({
                                                identificador: id,
                                                data: date,
                                                hora: hour,
                                                latitude: latitude,
                                                longitude: longitude,
                                                saved: true,      
                                              })
                                      }}
                              style={styles.buttons}
            >
              <Icon 
                name='check' 
                size={30} 
                color='#FFF'
                style={styles.icon}
              />
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
    backgroundColor: '#21243D',
  },
  title: {
    fontSize: 23,
    color: '#FFF',
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  registroInput: {
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
    marginTop: 30,
    backgroundColor: '#FAFAFA',
    fontSize: 20,    
  },
  registroInfos: {
    alignItems: 'flex-start',
    width: '80%',
  },
  infosText: {
    marginTop: 30,
    fontSize: 20,
  },
  registroButtons: {
    width: '100%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',   
    flexDirection: 'column', 
  },
  buttons: {
    backgroundColor: '#21243D',
    borderRadius: 20,
    height: 45,
    width: '80%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NovoRegistro;