import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Share from 'react-native-share';

const Compartilhar = ({ navigation, route }) => {
  const {id, date, hour, latitude, longitude } = route.params.register;
  const { url } = route.params;

  console.log(url);

  const onShare = () => {
    const options = Platform.select({
      android: {
        message: `${id} registrado(a) na localização ${latitude}/${longitude} no dia ${date} às ${hour} horas.`,
        url,
      }
    })
    Share.open(options)
  };
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareText}>Compartilhar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={() => { navigation.goBack() }}>
        <Text style={styles.shareText}>Cancelar</Text>
      </TouchableOpacity>
    </View>    
  )
}

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#21243D',
    borderRadius: 20,
    height: 45,
    width: '80%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareText: {
    fontWeight: 'bold',
    color: '#FFF'
  }  
})

export default Compartilhar;