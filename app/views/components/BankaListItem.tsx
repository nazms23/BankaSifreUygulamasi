import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import {Surface, useTheme, Avatar,Text } from 'react-native-paper'



interface BankaListItemProps {
    text: string
}

const BankaListItem = ({text}: BankaListItemProps) => {
    const {colors} = useTheme()


    return (

        <View style={[styles.itemcont]}>
            <Surface style={styles.surface} elevation={5}>
                <View style={styles.imagecont}><Image style={styles.image}  source={require('../../../assets/bankalar/garanti.png')} /></View>
                
                <Text style={styles.surfaceText}  variant="titleMedium">3169</Text>
              
            </Surface>
        </View>
  )
}


export default BankaListItem

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

  },
});