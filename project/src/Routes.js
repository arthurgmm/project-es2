import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import NovoRegistro from './pages/Novo Registro';

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
    </Stack.Navigator>
  );
}