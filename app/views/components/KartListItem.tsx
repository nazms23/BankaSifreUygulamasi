import { View, Image, Pressable, Animated } from 'react-native'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Surface, useTheme, Text, Card, IconButton } from 'react-native-paper'
import { stylesItems } from '../../utils/styles'
import { KartSifreler, SelectedMode } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import * as Clipboard from 'expo-clipboard';
import { NotificationContext } from '../../utils/NotificationContext'
import { NotificationType } from '../../utils/types'
import { MainContext } from '../../utils/MainContext'

interface KartListItemProps {
  kart: KartSifreler
  onPress: () => void
  selectedMode: SelectedMode
}

const KartListItem = ({ kart, onPress, selectedMode }: KartListItemProps) => {
  const { colors } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  const { setFunctions, secretKey } = useContext(PasswordsContext);
  const { showNotification } = useContext(NotificationContext)
  const { settings } = useContext(MainContext);
  const [censor, setCensor] = useState(settings.censorable);

  const decrypted = useMemo(() => {
    return setFunctions.decryptPassword(kart.sifre, secretKey);
  }, [kart.sifre, secretKey]);

  const animatedHeight = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(0)).current

  const [contentHeight, setContentHeight] = useState(0);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isExpanded]);

  const heightInterpolate = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  return (
    <Pressable
      style={[{ flex: 1 }, { backgroundColor: colors?.background }]}
      onPress={() => {
        if (selectedMode == SelectedMode.None && settings.censorable) {
          setCensor(prev => !prev)
        } else {
          onPress()
        }
      }}
    >
      <Card style={[{ marginTop: 10, marginBottom: 10, paddingBottom: 0, paddingTop: 0 }]}>

        <View style={[stylesItems.itemcont, { marginTop: 0 }]}>

          <Surface style={[stylesItems.surface, {
            borderWidth: selectedMode === SelectedMode.Edit || selectedMode === SelectedMode.Delete ? 1 : undefined,
            boxShadow: selectedMode == SelectedMode.Edit ? '0px 1px 5px #fcefb4' :
              selectedMode === SelectedMode.Delete ? '0px 1px 5px #ef233c' : undefined,
            borderColor: selectedMode == SelectedMode.Edit ? "#ffd60a" :
              selectedMode === SelectedMode.Delete ? "#ef233c" : undefined
          }]} elevation={5}>
            <View style={stylesItems.imagecont}><Image style={stylesItems.image} source={kart.kart.gorsel} /></View>
            <Text style={stylesItems.surfaceText} variant="titleMedium">
              {censor ? decrypted.slice(0, 2) + "**" : decrypted}
            </Text>

            <IconButton
              style={stylesItems.acbut}
              icon={isExpanded ? "arrow-up" : "arrow-down"}
              mode="outlined"
              onPress={() => {
                if (selectedMode === SelectedMode.None)
                  setIsExpanded(prev => !prev)
              }}
            />
          </Surface>
        </View>
        <View
          style={{ position: "absolute", opacity: 0, left: 0, right: 0 }}
          pointerEvents="none"
          onLayout={(event) => {
            if (!measured) {
              const h = event.nativeEvent.layout.height;
              setContentHeight(h);
              setMeasured(true);
            }
          }}
        >
          <Card.Content>
            <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary, flexDirection: 'column', alignItems: 'stretch' }]}>
              <Text style={{ marginBottom: 3 }} variant="titleSmall">Açıklama</Text>
              <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                <Text variant="labelMedium">{kart.aciklama}</Text>
              </View>
            </View>

            <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
              <Text variant="titleSmall">Kart Numarası</Text>
              <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                <Text variant="labelMedium">
                  {censor ? kart.kartNumarasi?.slice(0, 4) + " **** **** ****" : kart.kartNumarasi}
                </Text>
              </View>
            </View>

            <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
              <Text variant="titleSmall">Son Kullanma Tarihi</Text>
              <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                <Text variant="labelMedium">
                  {censor ? kart.kartSonKullanmaTarihi?.slice(0, 2) + "/**" : kart.kartSonKullanmaTarihi}
                </Text>
              </View>
            </View>

            <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
              <Text variant="titleSmall">Kart CVC</Text>
              <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                <Text variant="labelMedium">
                  {censor ? kart.kartCVC?.slice(0, 1) + "**" : kart.kartCVC}
                </Text>
              </View>
            </View>
          </Card.Content>
        </View>
        <Animated.View
          style={{
            height: heightInterpolate,
            opacity: animatedOpacity,
            overflow: 'hidden',
          }}
        >
          <Card.Content>

            <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary, flexDirection: 'column', alignItems: 'stretch' }]}>
              <Text style={{ marginBottom: 3 }} variant="titleSmall">Açıklama</Text>
              <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                <Text variant="labelMedium">{kart.aciklama}</Text>
              </View>
            </View>

            <Pressable
              onPress={async () => {
                if (selectedMode != SelectedMode.None) return;
                await Clipboard.setStringAsync(kart.kartNumarasi?.replace(/ /g, '') ?? '');
                showNotification(NotificationType.Success, "Kart Numarası kopyalandı!");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
                <Text variant="titleSmall">Kart Numarası</Text>
                <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                  <Text variant="labelMedium">
                    {censor ? kart.kartNumarasi?.slice(0, 4) + " **** **** ****" : kart.kartNumarasi}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              onPress={async () => {
                if (selectedMode != SelectedMode.None) return;
                await Clipboard.setStringAsync(kart.kartSonKullanmaTarihi ?? '');
                showNotification(NotificationType.Success, "Son Kullanma Tarihi kopyalandı!");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
                <Text variant="titleSmall">Son Kullanma Tarihi</Text>
                <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                  <Text variant="labelMedium">
                    {censor ? kart.kartSonKullanmaTarihi?.slice(0, 2) + "/**" : kart.kartSonKullanmaTarihi}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              onPress={async () => {
                if (selectedMode != SelectedMode.None) return;
                await Clipboard.setStringAsync(kart.kartCVC ?? '');
                showNotification(NotificationType.Success, "CVV kopyalandı!");
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
              <View style={[stylesItems.kartInfo, { backgroundColor: colors?.onSecondary }]}>
                <Text variant="titleSmall">Kart CVC</Text>
                <View style={[stylesItems.kartInfoAlt, { backgroundColor: colors?.background }]}>
                  <Text variant="labelMedium">
                    {censor ? kart.kartCVC?.slice(0, 1) + "**" : kart.kartCVC}
                  </Text>
                </View>
              </View>
            </Pressable>

          </Card.Content>
        </Animated.View>

      </Card>
    </Pressable>
  )
}

export default KartListItem
