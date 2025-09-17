import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Appbar, BottomNavigation, BottomNavigationRoute } from 'react-native-paper'
import Banka from './banka/Banka'
import Kart from './kart/Kart'
import Ayarlar from './ayarlar/Ayarlar'
import { RootStackParamList } from '../../utils/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface MainProps{
    navigation: NativeStackNavigationProp<RootStackParamList, "App">
}

const Main = ({navigation}: MainProps) => {
    const [index, setIndex] = useState(0)
    const [routes] = useState<BottomNavigationRoute[]>([
        { key: 'banka', title: 'Banka Şifreleri', unfocusedIcon: 'bank-outline', focusedIcon: 'bank'},
        { key: 'kart', title: "Kart Bilgileri", unfocusedIcon: 'credit-card-outline', focusedIcon: 'credit-card'}
    ])


    const renderScene = BottomNavigation.SceneMap({
        banka: Banka,
        kart: Kart
    })

    function handleSettingsButton(){
        navigation.navigate("Settings")
    }

  return (
    <>
    <Appbar.Header>
        <Appbar.Content title={routes[index].title} />
        <Appbar.Action icon={'cog'} onPress={handleSettingsButton} />
    </Appbar.Header>
    <BottomNavigation 
        navigationState={{index,routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
    </>
  )
}

export default Main