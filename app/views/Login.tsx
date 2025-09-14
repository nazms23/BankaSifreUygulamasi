import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NotificationType, Theme } from '../utils/types'
import { Button, useTheme, TextInput, Card } from 'react-native-paper'
import { MainContext } from '../utils/MainContext'
import PageLoading from './components/PageLoading'
import { NotificationContext } from '../utils/NotificationContext'

const Login = () => {
    const {login,settings,setFunctions} = useContext(MainContext)
    const {showNotification} = useContext(NotificationContext)
    const {colors} = useTheme()

    const [passwordValue, setPasswordValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleLogin()
    {
      setIsLoading(true)
      if(passwordValue == login.password)
      {
        setFunctions.setIsLogined(true)
      }else
      {
        setIsLoading(false)
        showNotification(NotificationType.Error, "Girdiğiniz Şifre Yanlış!")
      }
    }

    function handleTema()
    {
      setFunctions.setTheme(settings.theme == Theme.dark ? Theme.light : Theme.dark)
    }

    return (
      <View style={[{flex:1, justifyContent:"center"}, {backgroundColor: colors?.background}]} >
        <PageLoading loading={isLoading} />
        <Card>
          <TextInput
            label={"Şifre"}
            value={passwordValue}
            onChangeText={text => setPasswordValue(text)}
            keyboardType='numeric'
            maxLength={6}
            mode='outlined'
            secureTextEntry
          />
          <Button mode='contained-tonal' onPress={handleLogin}>Giriş</Button>
          <Button mode='contained' onPress={handleTema}>Tema değiştir</Button>
        </Card>
      </View>
    )
}

export default Login