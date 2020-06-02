import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import NovoRegistro from './pages/Novo Registro';
import Video from './pages/Video';
import Registros from './pages/Registros';
import Audio from './pages/Audio';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Novo" component={NovoRegistro} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Registros" component={Registros} />
      <Stack.Screen name="Audio" component={Audio} />
    </Stack.Navigator>
  );
}