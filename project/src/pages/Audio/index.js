import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Modal, PermissionsAndroid, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Share from 'react-native-share';

const Audio = ({ navigation }) => { 
  const [isRecording, setIsRecording] = useState(false);
  const [capturedAudio, setCapturedAudio] = useState(null);
  const [open, setOpen] = useState(false);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const onShare = () => {
    const options = Platform.select({
      android: {
        message: `Registro de aglomeração`,
        url: capturedAudio,
      }
    })
    Share.open(options)
  };
  
  async function audioPermission(){
    if(Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissão para áudio',
            message: 'Permissão para gravar áudio do dispositivo',
            buttonPositive: 'Ok',
          },
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Áudio: Aceito');
        } else {
          console.log('Permissão Negada');
          return;
        }
      } catch(err) {
        console.warn(err);
        return;
      }
    }    
  }

  async function writePermission(){
    if(Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão para gravação',
            message: 'Permissão para gravar arquivos no dispositivo',
            buttonPositive: 'Ok',
          },
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Escrita: Aceito');
        } else {
          console.log('Permissão Negada');
          return;
        }
      } catch(err) {
        console.warn(err);
        return;
      }
    }    
  }

  async function onStartRecord(){
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener();
    setCapturedAudio(result);
    console.log(result);
  };

  async function onStopRecord(){
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log(result);
  };

  useEffect(() => {
    audioPermission();
  }, [])

  useEffect(() => {
    writePermission();
  }, [])  
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPressIn={() => {
                                    setIsRecording(true);
                                    onStartRecord();
                                  }} 
                                  onPressOut={() => {
                                    setIsRecording(false);
                                    setOpen(true);
                                    onStopRecord();
                                  }}>
          <Icon name='microphone' size={60} style={[isRecording ? styles.recTrue : styles.recFalse]}/>
        </TouchableWithoutFeedback>
        <Text style={styles.text}>Precione para gravar</Text>
      </View>

      { open && 
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  recTrue: {
    color: 'red',
  },
  recFalse: {
    color: '#000',
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
    color: '#FFF'
  }    
})

export default Audio;