import { View, Image } from 'react-native'
import React, { useContext } from 'react'
import {Surface, useTheme, Avatar,Text ,Badge} from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
import { BankaSifre } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'


interface BankaListItemProps {
    banka: BankaSifre
}

const BankaListItem = ({banka}: BankaListItemProps) => {
    const {colors} = useTheme()
    const {setFunctions, secretKey} = useContext(PasswordsContext);

    return (
        <View style={[stylesItems.itemcont]}>
            <Surface style={stylesItems.surface} elevation={5}>
                <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={banka.banka.gorsel} /></View>
                <Text style={stylesItems.surfaceText}  variant="titleMedium">{setFunctions.decryptPassword(banka.sifre, secretKey)}</Text>
                <Badge style={stylesItems.badges}>expires 20dy.</Badge>
            </Surface>
        </View>
    )
}


export default BankaListItem

