import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import Share from 'react-native-share';

const Video = ({ navigation, route }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [capturedRecord, setCapturedRecord] = useState(null);
  const [open, setOpen] = useState(null);
  
  const {id, date, hour, latitude, longitude } = route.params;

  const onShare = () => {
    const options = Platform.select({
      android: {
        message: `${id} registrado(a) na localização ${latitude}/${longitude} no dia ${date} às ${hour} horas.`,
        url: capturedRecord.uri,
      }
    })
    Share.open(options)
  };
  
  async function record(){
    if(camera) {
      if(!isRecording){
        setIsRecording(true);
        const data = await camera.recordAsync();
        setCapturedRecord(data);
      } else {
        setIsRecording(false);
        camera.stopRecording();
        setOpen(true);
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
        <Modal
          animationType='slide'
          transparent={false}
          visible={open}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Text style={styles.shareText}>Compartilhar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={() => {
                                                                          setOpen(false)
                                                                          navigation.goBack()
                                                                        }}
            >
              <Text style={styles.shareText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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

export default Video;