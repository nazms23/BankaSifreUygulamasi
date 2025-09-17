import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LoginMethods, NotificationType, Theme } from '../utils/types'
import { Button, useTheme, TextInput, Card } from 'react-native-paper'
import { MainContext } from '../utils/MainContext'
import PageLoading from './components/PageLoading'
import { NotificationContext } from '../utils/NotificationContext'
import * as LocalAuthentication from "expo-local-authentication";

const Login = () => {
    const {login,setFunctions} = useContext(MainContext)
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

    async function authenticateWithBiometrics(): Promise<boolean> {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) return false;

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) return false;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Biyometrik doğrulama",
        fallbackLabel: "Şifre gir",
        disableDeviceFallback: false,
      });

      return result.success;
    }

    function handleResetData() {
      setFunctions.resetAllSettings()
    }

    async function handleForgetPassword() {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if(!hasHardware || !isEnrolled){
        showNotification(NotificationType.Error, "Biyometrik doğrulama kullanılamıyor! Bunun yerine tüm verilerinizi sıfırlamak ister misiniz?", true, handleResetData)
        return
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Biyometrik doğrulama",
        fallbackLabel: "Şifre gir",
        disableDeviceFallback: false,
      });

      if(result.success) setFunctions.setIsLogined(true)
      else showNotification(NotificationType.Error, "Biyometrik doğrulama başarısız!")
    }

    useEffect(() => {
      login.loginMethod == LoginMethods.biometric && authenticateWithBiometrics().then(result => {
        if(result)
        {
          setFunctions.setIsLogined(true)
        }
        else
        {
          showNotification(NotificationType.Error, "Biyometrik doğrulama başarısız!")
        }
      })
    }, [])

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
          <Button onPress={handleForgetPassword}>Şifremi Unuttum</Button>
        </Card>
      </View>
    )
}

export default Login