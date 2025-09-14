import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SegmentedButtons, Text, useTheme } from 'react-native-paper'
import { MainContext } from '../../../utils/MainContext'
import { FontSizes, Theme } from '../../../utils/types'

const GenelAyarlar = () => {
  const {colors} = useTheme()

  const {settings,setFunctions} = useContext(MainContext)

  return (
    <View style={[{flex:1, justifyContent:"flex-start"}, {backgroundColor: colors?.background}]}>
      <Text>Yazı boyutu</Text>
      <SegmentedButtons 
        value={settings.fontSize}
        onValueChange={(v) => setFunctions.setFontSize((v) as FontSizes)}
        buttons={[
          {
            value: FontSizes.small,
            label: "Küçük"
          },
          {
            value: FontSizes.default,
            label: "Varsayılan"
          },
          {
            value: FontSizes.large,
            label: "Büyük"
          }
        ]}
      />
      <Text>Tema</Text>
      <SegmentedButtons 
        value={settings.theme}
        onValueChange={(v) => setFunctions.setTheme((v) as Theme)}
        buttons={[
          {
            icon: 'weather-sunny',
            value: Theme.light,
            label: "Açık"
          },
          {
            icon: "weather-night",
            value: Theme.dark,
            label: "Karanlık"
          }
        ]}
      />
    </View>
  )
}

export default GenelAyarlar