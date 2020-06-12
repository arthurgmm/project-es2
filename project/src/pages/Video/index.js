import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

const Video = ({ navigation, route }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [capturedRecord, setCapturedRecord] = useState(null);

  async function record(){
    if(camera) {
      if(!isRecording){
        setIsRecording(true);
        const data = await camera.recordAsync();
        setCapturedRecord(data);
      } else {
        setIsRecording(false);
        camera.stopRecording();
      }
    }
  };  
  
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permissão para uso da câmera',
          message: 'Precisamos da sua permissão para o uso da câmera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permissão para gravação de áudio',
          message: 'Precisamos da sua permissão para gravação de áudio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={record} style={styles.capture}>
          <Icon name='record-rec' size={95} style={[isRecording ? styles.recTrue : styles.recFalse]}/>
        </TouchableOpacity>
      </View>
      </RNCamera>

      { capturedRecord && 
        navigation.navigate('Compartilhar', {
          register: route.params,
          url: capturedRecord.uri, 
        })
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 5,
  },
  recTrue: {
    color: 'red',
  },
  recFalse: {
    color: '#FFF',
  },
})

export default Video;