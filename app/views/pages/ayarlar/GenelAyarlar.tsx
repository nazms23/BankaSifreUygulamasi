import {View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Text , Surface, IconButton,Divider,useTheme } from 'react-native-paper'
import { stylesSettings } from '../../../utils/styles'
import { MainContext } from '../../../utils/MainContext'
import { FontSizes, Theme } from '../../../utils/types'

const GenelAyarlar = () => {
  const {colors} = useTheme()
  const {settings,setFunctions} = useContext(MainContext)

  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={stylesSettings.surface} elevation={5}>
          <Text variant="titleMedium">Görünüm</Text>
         <Divider style={stylesSettings.divider} />
          <View style={stylesSettings.rowbox}>
             <View style={stylesSettings.columnbox}>
                <IconButton style={stylesSettings.selected}
                  mode='contained'
                  icon=  "tooltip-image-outline"
                  iconColor={'#ECEFF1'}
                  size={50}
                  onPress={() => console.log('Pressed')}
                />
                <Text  variant="titleSmall">Resim</Text>
             </View>
           
            <View style={stylesSettings.columnbox}>
              <IconButton
                mode='contained'
                icon= "tooltip-text-outline"
                size={50}
                iconColor={'#ECEFF1'}
                onPress={() => console.log('Pressed')}
              />
              <Text  variant="titleSmall">Yazı</Text>
            </View>
          </View>
      </Surface>
      <Surface style={stylesSettings.surface} elevation={5}>
          <Text  variant="titleMedium">Tema</Text>
         <Divider style={stylesSettings.divider} />
          <View style={stylesSettings.rowbox}>
             <View style={stylesSettings.columnbox}>
                <IconButton style={settings.theme == Theme.dark && stylesSettings.selected}
                  mode='contained'
                  icon=      "weather-night"
                  iconColor={'#212121'}
                  size={50}
                  onPress={() => setFunctions.setTheme(Theme.dark)}
                />
                <Text  variant="titleSmall">Karanlık</Text>
             </View>
           
            <View style={stylesSettings.columnbox}>
              <IconButton style={settings.theme == Theme.light && stylesSettings.selected}
                mode='contained'
                icon=     "weather-sunny"
                  iconColor={'#FFFDE7'}
                size={50}
               
                onPress={() => setFunctions.setTheme(Theme.light)}
              />
              <Text  variant="titleSmall">Aydınlık</Text>
            </View>
  
          </View>
      </Surface>
        <Surface style={stylesSettings.surface} elevation={5}>
          <Text  variant="titleMedium">Boyutlandırma</Text>
         <Divider style={stylesSettings.divider} />
          <View style={stylesSettings.rowbox}>
             <View style={stylesSettings.columnbox}>
                <IconButton style={settings.fontSize == FontSizes.large && stylesSettings.selected}
                  mode='contained'
                  icon=     "format-font-size-increase"
                    iconColor={'#ECEFF1'}
                  size={50}
                  onPress={() => setFunctions.setFontSize(FontSizes.large)}
                />
                <Text  variant="titleSmall">Büyük Yazı</Text>
             </View>
           
            <View style={stylesSettings.columnbox}>
              <IconButton style={settings.fontSize == FontSizes.small && stylesSettings.selected}
                mode='contained'
                icon=       "format-font-size-decrease"
                    iconColor={'#ECEFF1'}
                size={50}
               
                onPress={() => setFunctions.setFontSize(FontSizes.small)}
              />
              <Text  variant="titleSmall">Küçük Yazı</Text>
            </View>
          </View>
      </Surface>
    </ScrollView>
  )
}
export default GenelAyarlar
