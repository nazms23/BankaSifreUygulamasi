import { View, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import {Surface, useTheme, Text,Card} from 'react-native-paper'
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
    <Pressable style={[{flex:1}, {backgroundColor: colors?.background}]} onPress={onPress}>
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
          <Text variant="bodyMedium">Açıklama: {kart.aciklama}</Text>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartNumarasi?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "Kart numarası başarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Text variant="bodyMedium">Kart Numarası: {kart.kartNumarasi}</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartSonKullanmaTarihi?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "Son kullanma tarihi basarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Text variant="bodyMedium">Son Kullanma Tarihi: {kart.kartSonKullanmaTarihi}</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              if(selectedMode != SelectedMode.None) return;

              await Clipboard.setStringAsync(kart.kartCVC?.toString().replace(/ /g, '') ?? '');

              showNotification(NotificationType.Success, "CvC basarıyla kopyalandı!");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Text variant="bodyMedium">CvC: {kart.kartCVC}</Text>
          </Pressable>
        </Card.Content>
      </Card>
    </Pressable>
  )
}

export default KartListItem
