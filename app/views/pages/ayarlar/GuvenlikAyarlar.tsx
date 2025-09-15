import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper'
import { MainContext } from '../../../utils/MainContext'
import { NotificationContext } from '../../../utils/NotificationContext'
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
    <View style={[{flex:1, justifyContent:"flex-start", }, {backgroundColor: colors?.background}]}>
      <SegmentedButtons 
        value={login.loginMethod.toString()}
        onValueChange={(v) => setFunctions.setLoginMethod((v) as LoginMethods)}
        buttons={[
          {
            label: "Yok",
            value: LoginMethods.none.toString()
          },
          {
            label: "Şifre",
            value: LoginMethods.password.toString()
          },
          {
            label: "Biyometrik Doğrulama",
            value: LoginMethods.biometric.toString()
          }
        ]}
      />
      {
        login.loginMethod == LoginMethods.password ? 
          <>
            <TextInput 
              label={"Şifre"}
              value={passwordValue}
              onChangeText={text => setPasswordValue(text)}
              keyboardType='numeric'
              maxLength={6}
              mode='outlined'
              secureTextEntry
            />
            <Button mode='contained-tonal' onPress={handleChangePassword}>Kaydet</Button>
          </>
          : 
          null
      }
    </View>
  )
}

export default GuvenlikAyarlar