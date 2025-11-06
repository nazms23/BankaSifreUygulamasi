import { View, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import {Surface, useTheme, Avatar,Text ,Badge} from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
import { BankaSifre, SelectedMode } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'


interface BankaListItemProps {
    banka: BankaSifre
    onPress: () => void
    selectedMode: SelectedMode
}

const BankaListItem = ({banka,selectedMode, onPress}: BankaListItemProps) => {
    const {colors} = useTheme()
    const {setFunctions, secretKey} = useContext(PasswordsContext);

    return (
        <Pressable style={[ stylesItems.itemcont]} onPress={onPress}>
            <Surface style={[stylesItems.surface,{
                
                borderWidth: selectedMode === SelectedMode.Edit || selectedMode === SelectedMode.Delete ? 2 : undefined, 
                borderColor: selectedMode == SelectedMode.Edit ? "yellow" : selectedMode === SelectedMode.Delete ? "red" : undefined
            }]} elevation={5}>
                <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={banka.banka.gorsel} /></View>
                <Text style={stylesItems.surfaceText}  variant="titleMedium">{setFunctions.decryptPassword(banka.sifre, secretKey)}</Text>
                <Badge style={stylesItems.badges}>expires 20dy.</Badge>
            </Surface>
        </Pressable>
    )
}


export default BankaListItem

