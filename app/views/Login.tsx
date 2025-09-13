import { View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/types'
import { Button, useTheme, Text } from 'react-native-paper'

interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">
}

const Login = ({navigation}: LoginProps) => {
    const {colors} = useTheme()

    function handleLogin()
    {
      navigation.replace("App");
    }

    return (
      <View style={[{flex:1, alignItems: 'center', justifyContent: 'center'}, {backgroundColor: colors?.background}]}>
        <Button mode='contained-tonal' onPress={handleLogin}>Giriş</Button>
      </View>
    )
}

export default Login