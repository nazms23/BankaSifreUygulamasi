import { View } from 'react-native'
import React, { useState } from 'react'
import { Appbar, BottomNavigation, BottomNavigationRoute, Card, Text } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../utils/types'
import GenelAyarlar from './GenelAyarlar'
import GuvenlikAyarlar from './GuvenlikAyarlar'
import Bilgilendirme from './Bilgilendirme'

interface AyarlarProps{
    navigation: NativeStackNavigationProp<RootStackParamList, "Settings">
}

const Ayarlar = ({navigation}: AyarlarProps) => {
    const [index, setIndex] = useState(0)
    const [routes] = useState<BottomNavigationRoute[]>([
        { key: 'genel', title: 'Genel', unfocusedIcon: 'cog-outline', focusedIcon: 'cog'},
        { key: 'guvenlik', title: "Güvenlik", unfocusedIcon: 'shield-lock-outline', focusedIcon: 'shield-lock'},
        { key: 'bilgilendirme', title: "Bilgilendirme", unfocusedIcon: 'information-outline', focusedIcon: 'information'}
    ])


    const renderScene = BottomNavigation.SceneMap({
        genel: GenelAyarlar,
        guvenlik: GuvenlikAyarlar,
        bilgilendirme: Bilgilendirme
    })

    function handleBackAction(){
        navigation.navigate("App")
    }

  return (
    <>
        <Appbar.Header>
            <Appbar.BackAction onPress={handleBackAction} />
            <Appbar.Content title={`Ayarlar - ${routes[index].title}`} />
        </Appbar.Header>

        <BottomNavigation 
            navigationState={{index,routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    </>
  )
}

export default Ayarlar