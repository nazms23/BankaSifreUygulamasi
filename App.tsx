import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/views/Login';
import Main from './app/views/pages/Main';
import { DefaultTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import Ayarlar from './app/views/pages/ayarlar/Ayarlar';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const theme: ThemeProp = isDarkTheme ? MD3DarkTheme : MD3LightTheme
  
  /* {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
    primaryContainer: '#3700b3',
    secondaryContainer: '#1cd016ff',
    background: 'red',
    surface: 'blue',
    scrim: 'yellow',
    outline: "lime",
    tertiaryContainer: "lime"
  }} */

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='App' component={Main} />
          <Stack.Screen name='Settings' component={Ayarlar} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
