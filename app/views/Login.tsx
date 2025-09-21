import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LoginMethods, NotificationType, Theme } from '../utils/types'
import {Text, Button, useTheme, TextInput, Surface } from 'react-native-paper'
import { MainContext } from '../utils/MainContext'
import PageLoading from './components/PageLoading'
import { NotificationContext } from '../utils/NotificationContext'
import * as LocalAuthentication from "expo-local-authentication"
import {stylesLogin} from '../.../../utils/styles'
import { PasswordsContext } from '../utils/PasswordsContext'

const Login = () => {
    const {login,setFunctions} = useContext(MainContext)
    const password = useContext(PasswordsContext)
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
      password.setFunctions.resetAllSettings()
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
     
      <View style={[stylesLogin.container, {backgroundColor: colors?.background}]} >
        <PageLoading loading={isLoading} />
        <Surface style={stylesLogin.surface} elevation={5}>
          <Text style={{fontWeight:900}} variant='headlineSmall'>BankApp</Text>
          <TextInput
            style={stylesLogin.input}
            label={"Açmak için şifreni gir."}
            value={passwordValue}
            onChangeText={text => setPasswordValue(text)}
            keyboardType='numeric'
            maxLength={6}
            mode='outlined'
            secureTextEntry
          />
          <Button style={stylesLogin.button} mode='contained' onPress={handleLogin}>Giriş Yap</Button>
          <Button  style={stylesLogin.button} onPress={handleForgetPassword}>Şifremi Unuttum</Button>
        </Surface>
      </View>
    )
}

export default Login