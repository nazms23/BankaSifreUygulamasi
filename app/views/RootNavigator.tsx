import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, Portal, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Main from './pages/Main';
import Ayarlar from './pages/ayarlar/Ayarlar';
import { MainContext } from '../utils/MainContext';
import { Theme } from '../utils/types';
import LoadingScreen from './pages/LoadingScreen';
import { NotificationContextProvider } from '../utils/NotificationContext';
import { StatusBar } from 'expo-status-bar';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    const {isAllLoaded,settings, login} = useContext(MainContext)

    const theme: ThemeProp = settings.theme == Theme.dark ? MD3DarkTheme : MD3LightTheme
    
    return (
        <PaperProvider theme={theme}>
            <StatusBar 
                style={settings.theme == Theme.dark ? 'light' : 'dark'}
                backgroundColor={theme.colors?.background ?? "#fff"}
            />
            <NotificationContextProvider>
                {
                    isAllLoaded ? <NavigationContainer>
                        <Stack.Navigator screenOptions={{headerShown: false}}>
                        {
                            !login.isLogined ?
                            <Stack.Screen name='Login' component={Login} />
                            :
                            <>
                                <Stack.Screen name='App' component={Main} />
                                <Stack.Screen name='Settings' component={Ayarlar} />
                            </>
                        }
                        </Stack.Navigator>
                    </NavigationContainer> 
                    :
                    <LoadingScreen />
                }
            </NotificationContextProvider>
        </PaperProvider>
    )
}

export default RootNavigator