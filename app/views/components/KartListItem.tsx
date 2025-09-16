import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import {Surface, useTheme, Text,Card, CardProps, CardActionsProps, CardContentProps, CardCoverProps,CardTitleProps } from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
interface KartListItemProps {
    text: string
}

const KartListItem = ({text}: KartListItemProps) => {
    const {colors} = useTheme()


    return (

        <View style={[{flex:1}, {backgroundColor: colors?.background}]}>
          <Card>
            <View style={[stylesItems.itemcont]}>
                <Surface style={stylesItems.surface} elevation={5}>
                    <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={require('../../../assets/bankalar/garanti.png')} /></View>
                    
                    <Text style={stylesItems.surfaceText}  variant="titleMedium">3169</Text>
                
                </Surface>
            </View>
            <Card.Content>
            <Text variant="titleLarge">Kart Numarası: 8558 5885 5886 5757</Text>
            <Text variant="bodyMedium">CvC: 5030000</Text>
            </Card.Content>

       
        
          </Card>
        </View>
  )
}

export default KartListItem
