import { Settings, View } from 'react-native'
import React from 'react'
import { Text , Surface, IconButton, MD3Colors,Divider, DividerProps} from 'react-native-paper'

import { stylesSettings } from '../../../utils/styles'


const GenelAyarlar = () => {
  return (
    <View style={stylesSettings.setting}>
      <Surface style={stylesSettings.surface} elevation={5}>
          <Text  variant="titleMedium">Görünüm</Text>
         <Divider style={stylesSettings.divider} />
          <View style={stylesSettings.rowbox}>
             <View style={stylesSettings.columnbox}>
                <IconButton style={stylesSettings.selected}
                  mode='contained'
                  icon=  "tooltip-image-outline"
                  iconColor={'#388E3C'}
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
               
                onPress={() => console.log('Pressed')}
              />
              <Text  variant="titleSmall">Yazı</Text>
            </View>
  
          </View>


      </Surface>
    </View>
  )
}

export default GenelAyarlar
