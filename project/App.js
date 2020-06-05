import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/Routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}