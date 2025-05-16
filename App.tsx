import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import "./global.css"
import { useEffect } from 'react';
import { initDatabase } from './src/database';


import ChatScreen from './src/screens/ChatScreen';
import AgendaScreen from './src/screens/AgendaScreen';

const Stack = createNativeStackNavigator();

export default function App() {

    useEffect(() => {
      initDatabase();
    }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Agenda" component={AgendaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
