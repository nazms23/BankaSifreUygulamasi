import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import {Surface, useTheme, Avatar,Text ,Badge} from 'react-native-paper'
import { stylesItems } from '../../utils/styles'


interface BankaListItemProps {
    text: string
}

const BankaListItem = ({text}: BankaListItemProps) => {
    const {colors} = useTheme()


    return (

        <View style={[stylesItems.itemcont]}>
          
            <Surface style={stylesItems.surface} elevation={5}>
              
                <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={require('../../../assets/bankalar/garanti.png')} /></View>
               
                <Text style={stylesItems.surfaceText}  variant="titleMedium">3169</Text>
                 <Badge style={stylesItems.badges}>expires 20dy.</Badge>
            </Surface>
            
        </View>
  )
}


export default BankaListItem

