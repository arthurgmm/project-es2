import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

const Video = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [capturedRecord, setCapturedRecord] = useState();  
  
  async function record(){
    if(camera) {
      if(!isRecording){
        setIsRecording(true);
        const data = await camera.recordAsync();
        setCapturedRecord(data.uri);
      } else {
        setIsRecording(false);
        camera.stopRecording();
        console.log(capturedRecord);
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
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={record} style={styles.capture}>
          <Icon name='record-rec' size={80} style={[isRecording ? styles.recTrue : styles.recFalse]}/>
        </TouchableOpacity>
      </View>
      </RNCamera>
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
  }
})

export default Video;