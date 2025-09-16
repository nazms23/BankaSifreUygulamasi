import {View, ScrollView } from 'react-native'
import React from 'react'
import { Text , Surface, IconButton,Divider } from 'react-native-paper'

import { stylesSettings } from '../../../utils/styles'


const GenelAyarlar = () => {
  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={stylesSettings.surface} elevation={5}>
          <Text  variant="titleMedium">Görünüm</Text>
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
                <IconButton style={stylesSettings.selected}
                  mode='contained'
                  icon=      "weather-night"
                  iconColor={'#212121'}
                  size={50}
                  onPress={() => console.log('Pressed')}
                />
                <Text  variant="titleSmall">Karanlık</Text>
             </View>
           
            <View style={stylesSettings.columnbox}>
              <IconButton
                mode='contained'
                icon=     "weather-sunny"
                  iconColor={'#FFFDE7'}
                size={50}
               
                onPress={() => console.log('Pressed')}
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
                <IconButton style={stylesSettings.selected}
                  mode='contained'
                  icon=     "format-font-size-increase"
                    iconColor={'#ECEFF1'}
                  size={50}
                  onPress={() => console.log('Pressed')}
                />
                <Text  variant="titleSmall">Büyük Yazı</Text>
             </View>
           
            <View style={stylesSettings.columnbox}>
              <IconButton
                mode='contained'
                icon=       "format-font-size-decrease"
                    iconColor={'#ECEFF1'}
                size={50}
               
                onPress={() => console.log('Pressed')}
              />
              <Text  variant="titleSmall">Küçük Yazı</Text>
            </View>
  
          </View>
      </Surface>

    </ScrollView>
  )
}
export default GenelAyarlar
