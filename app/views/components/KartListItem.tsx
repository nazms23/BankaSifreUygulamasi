import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import {Surface, useTheme, Text,Card, CardProps, CardActionsProps, CardContentProps, CardCoverProps,CardTitleProps } from 'react-native-paper'

interface KartListItemProps {
    text: string
}

const KartListItem = ({text}: KartListItemProps) => {
    const {colors} = useTheme()


    return (

        <View style={[{flex:1}, {backgroundColor: colors?.background}]}>
          <Card>
            <View style={[styles.itemcont]}>
                <Surface style={styles.surface} elevation={5}>
                    <View style={styles.imagecont}><Image style={styles.image}  source={require('../../../assets/bankalar/garanti.png')} /></View>
                    
                    <Text style={styles.surfaceText}  variant="titleMedium">3169</Text>
                
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
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: '100%',
    borderRadius:12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  }, itemcont: {
    
    marginTop: 5,
     
    flexDirection: 'column',
  
   


 

  },
  surfaceText:{
    width: '70%',
    marginRight: 50,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontSize: 25,
  },
  imagecont:{
    backgroundColor: '#ffff',
    padding: 5,
    borderRadius: 6,
     width: '30%',
  }, image:{
    width: '100%',
    resizeMode: 'center',
    height: '100%',
    
    
    padding: 30,

  },});