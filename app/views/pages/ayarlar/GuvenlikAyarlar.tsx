import { View,ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text , Surface, Divider,Switch,Button, useTheme, TextInput } from 'react-native-paper'
import { MainContext } from '../../../utils/MainContext'
import { NotificationContext } from '../../../utils/NotificationContext'
import { stylesLogin, stylesSettings } from '../../../utils/styles'
import { LoginMethods, NotificationType } from '../../../utils/types'
const GuvenlikAyarlar = () => {

  const {colors} = useTheme()
  const [passwordValue, setPasswordValue] = useState("")

  const {settings,login,setFunctions} = useContext(MainContext)

  const {showNotification} = useContext(NotificationContext)

  function handleChangePassword()
  {
    if(passwordValue.length != 6)
    {
      showNotification(NotificationType.Error, "Şifreniz 6 karakterden oluşmalıdır!")
      return
    }

    setFunctions.setPassword(passwordValue)

    showNotification(NotificationType.Success, "Şifreniz başarıyla değiştirildi!")
    setPasswordValue("")
  }

  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={stylesSettings.surface} elevation={5}>
        <Text  variant="titleMedium">Giriş Seçenekleri</Text>
        <Divider style={stylesSettings.divider} />
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Şifresiz giriş yap</Text>
          <Switch value={login.loginMethod == LoginMethods.none} onValueChange={() => setFunctions.setLoginMethod(LoginMethods.none)} />
        </View>
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Şifre ile giriş yap</Text>
          <Switch value={login.loginMethod == LoginMethods.password} onValueChange={() => setFunctions.setLoginMethod(LoginMethods.password)} />
        </View>
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Parmak izi ile giriş yap</Text>
          <Switch value={login.loginMethod == LoginMethods.biometric} onValueChange={() => setFunctions.setLoginMethod(LoginMethods.biometric)} />
        </View>
      </Surface>
  
      {/* <Surface style={stylesSettings.surface} elevation={5}>

        <Text  variant="titleMedium">Bildirim Ayarları</Text>
        <Divider style={stylesSettings.divider} />
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Bildirimlere izin ver</Text>
          
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
         <Tooltip  title="Şifrelerinin süresi yaklaştığında bildirim alacaksın!" enterTouchDelay={0} leaveTouchDelay={5500} >
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Süresi yaklaşan şifreler</Text>
           <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        </Tooltip>
      </Surface> */}

      {
        login.loginMethod == LoginMethods.password ?
        <Surface style={stylesSettings.surface} elevation={5}>
          <Text  variant="titleMedium">Şifre Ayarları</Text>
          <Divider style={stylesSettings.divider} />
          <View style={[stylesSettings.rowbox, {flexDirection:"column"}]} >
              <TextInput
                label={"Şifre"}
                value={passwordValue}
                onChangeText={text => setPasswordValue(text)}
                secureTextEntry={true}
                keyboardType='numeric'
                mode='outlined'
                style={stylesLogin.input}
              />
              <Button  style={stylesSettings.button} icon="key" mode="elevated" onPress={handleChangePassword}>
                Şifre değiştir
              </Button>
          </View>
        </Surface>
        :
        null
      }
    </ScrollView> 
  )
}
export default GuvenlikAyarlar