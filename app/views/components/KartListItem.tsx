import { View, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import {Surface, useTheme, Text,Card, IconButton} from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
import { KartSifreler, SelectedMode } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import * as Clipboard from 'expo-clipboard';
import { NotificationContext } from '../../utils/NotificationContext'
import { NotificationType } from '../../utils/types'

interface KartListItemProps {
    kart: KartSifreler
    onPress: () => void
    selectedMode: SelectedMode
}

const KartListItem = ({kart,onPress,selectedMode}: KartListItemProps) => {
  const {colors} = useTheme()
  
  const {setFunctions, secretKey} = useContext(PasswordsContext);
  const {showNotification} = useContext(NotificationContext)
  return (
    <Pressable style={[{flex: 1}, {backgroundColor: colors?.background}]} onPress={onPress}>
      <Card style={[{marginTop:10,marginBottom:10, paddingBottom: 0, paddingTop: 0}]}>
        
        <View style={[stylesItems.itemcont, {marginTop: 0}]}>
          
            <Surface style={[stylesItems.surface, {
              borderWidth: selectedMode === SelectedMode.Edit || selectedMode === SelectedMode.Delete ? 1 : undefined, 
                boxShadow: selectedMode == SelectedMode.Edit ? '0px 1px 5px #fcefb4' : selectedMode === SelectedMode.Delete ? ' 0px 1px 5px #ef233c': undefined, 
                borderColor: selectedMode == SelectedMode.Edit ? "#ffd60a" : selectedMode === SelectedMode.Delete ? "#ef233c" : undefined
            }]} elevation={5}>
                <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={kart.kart.gorsel} /></View>
                <Text style={stylesItems.surfaceText}  variant="titleMedium">{setFunctions.decryptPassword(kart.sifre, secretKey)}</Text>
                <IconButton  style={stylesItems.acbut} icon="arrow-down" mode="outlined" onPress={() => console.log('Pressed')}></IconButton>
            </Surface>
        </View>
        <Card.Content>
            <Pressable></Pressable>
        </Card.Content>
      </Card>
            {/* Burası Kapalı Hali */}   {/* Bu halini atıyorum farklı brench te yana koymuş halini atıcam istediğini çek */}

     {/* ---------------------------------------------------------------------------------------------------------------- */}

            {/* Burası Açık Hali */}
      <Card>
        <View style={[stylesItems.itemcont]}>
          <Surface style={[stylesItems.surface, {
            borderWidth: selectedMode === SelectedMode.Edit || selectedMode === SelectedMode.Delete ? 1 : undefined, 
              boxShadow: selectedMode == SelectedMode.Edit ? '0px 1px 5px #fcefb4' : selectedMode === SelectedMode.Delete ? ' 0px 1px 5px #ef233c': undefined, 
              borderColor: selectedMode == SelectedMode.Edit ? "#ffd60a" : selectedMode === SelectedMode.Delete ? "#ef233c" : undefined
          }]} elevation={5}>
              <View style={stylesItems.imagecont}><Image style={stylesItems.image}  source={kart.kart.gorsel} /></View>
              <Text style={stylesItems.surfaceText}  variant="titleMedium">{setFunctions.decryptPassword(kart.sifre, secretKey)}</Text>
          </Surface>
        </View>
        <Card.Content>

         
          <View style={[stylesItems.kartInfo,{backgroundColor: colors?.onSecondary,flexDirection: 'column', alignItems:'stretch'}]}><Text style={[{marginBottom: 3}]}variant="titleSmall">Açıklama</Text><View style={[stylesItems.kartInfoAlt,{backgroundColor: colors?.background}]}><Text variant="labelMedium">{kart.aciklama}</Text></View></View>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartNumarasi?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "Kart numarası başarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <View style={[stylesItems.kartInfo,{backgroundColor: colors?.onSecondary}]}><Text variant="titleSmall">Kart Numarası</Text><View style={[stylesItems.kartInfoAlt,{backgroundColor: colors?.background}]}><Text variant="labelMedium">{kart.kartNumarasi}</Text></View></View>
          </Pressable>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartSonKullanmaTarihi?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "Son kullanma tarihi basarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
             <View style={[stylesItems.kartInfo,{backgroundColor: colors?.onSecondary}]}><Text variant="titleSmall">Son Kullanma Tarihi</Text><View style={[stylesItems.kartInfoAlt,{backgroundColor: colors?.background}]}><Text variant="labelMedium">{kart.kartSonKullanmaTarihi}</Text></View></View>
           
          </Pressable>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartCVC?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "CvC basarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <View style={[stylesItems.kartInfo,{backgroundColor: colors?.onSecondary}]}><Text variant="titleSmall">Kart CvC</Text><View style={[stylesItems.kartInfoAlt,{backgroundColor: colors?.background}]}><Text variant="labelMedium">{kart.kartCVC}</Text></View></View>
          
          </Pressable>
        </Card.Content>
      </Card>
      
    </Pressable>
  )
}

export default KartListItem
