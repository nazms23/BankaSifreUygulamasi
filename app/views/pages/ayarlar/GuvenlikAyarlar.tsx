import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper'
import { MainContext } from '../../../utils/MainContext'
import { NotificationContext } from '../../../utils/NotificationContext'
import { NotificationType } from '../../../utils/types'

const GuvenlikAyarlar = () => {
  const {colors} = useTheme()
  const [passwordValue, setPasswordValue] = useState("")

  const {settings,setFunctions} = useContext(MainContext)

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

  function handleChangeUseBiometric(value: string)
  {
    if(value == "yok")
    {
      setFunctions.setUseBiometricAuth(false)
      setFunctions.setPassword("")
    }
    else
    {
      setFunctions.setUseBiometricAuth(value == "true")
    }
  }

  return (
    <View style={[{flex:1, justifyContent:"flex-start", }, {backgroundColor: colors?.background}]}>
      <SegmentedButtons 
        value={settings.useBiometricAuth ? "true" : "false"}
        onValueChange={handleChangeUseBiometric}
        buttons={[
          {
            label: "Yok",
            value: "yok"
          },
          {
            label: "Şifre",
            value: "false"
          },
          {
            label: "Biyometrik Doğrulama",
            value: "true"
          }
        ]}
      />
      {
        !settings.useBiometricAuth ? 
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