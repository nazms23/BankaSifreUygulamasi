import { View, Image, Pressable } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import {Surface, useTheme, Avatar,Text ,Badge} from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
import { BankaSifre, SelectedMode } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import { MainContext } from '../../utils/MainContext'


interface BankaListItemProps {
    banka: BankaSifre
    onPress: () => void
    selectedMode: SelectedMode
}

const BankaListItem = ({banka,selectedMode, onPress}: BankaListItemProps) => {
    const {colors} = useTheme()
    const {setFunctions, secretKey} = useContext(PasswordsContext);
    const {settings} = useContext(MainContext);
    const [censor, setCensor] = useState(settings.censorable);

    const decrypted = useMemo(() => {
        return setFunctions.decryptPassword(banka.sifre, secretKey);
    }, [banka.sifre, secretKey]);

    return (
        <Pressable style={[ stylesItems.itemcont,{backgroundColor: colors?.background,borderRadius:12}]} onPress={() => {
            if(selectedMode == SelectedMode.None && settings.censorable)
            {
                setCensor(prev => !prev)
            }
            else
            {
                onPress()
            }
        }}>
            <Surface style={[stylesItems.surface,{
                borderWidth: selectedMode === SelectedMode.Edit || selectedMode === SelectedMode.Delete ? 1 : undefined, 
                boxShadow: selectedMode == SelectedMode.Edit ? '0px 1px 5px #fcefb4' : selectedMode === SelectedMode.Delete ? ' 0px 1px 5px #ef233c': undefined, 
                borderColor: selectedMode == SelectedMode.Edit ? "#ffd60a" : selectedMode === SelectedMode.Delete ? "#ef233c" : undefined
            }]} elevation={5}>
                <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={banka.banka.gorsel} /></View>
                <Text style={stylesItems.surfaceText}  variant="titleMedium">
                    {
                        censor ? decrypted.slice(0, 2) + "****" : decrypted
                    }
                </Text>
                {/* <Badge style={stylesItems.badges}>expires 20dy.</Badge> */}
            </Surface>
        </Pressable>
    )
}


export default BankaListItem

