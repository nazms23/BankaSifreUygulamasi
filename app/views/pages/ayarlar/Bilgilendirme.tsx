import { View, ScrollView, Linking } from 'react-native'
import React from 'react'
import { Text, Surface, IconButton, Divider, useTheme, Avatar } from 'react-native-paper'
import { stylesSettings } from '../../../utils/styles'

const Bilgilendirme = () => {
  const { colors } = useTheme()

  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={[stylesSettings.surface]} elevation={5}>
        <View style={[stylesSettings.columnbox, { alignItems: 'flex-start', marginBottom: 10 }]}>
          <Text style={[{ fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>
            Uygulamanın Amacı ve Bilgilendirme
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Uygulamamızın amacı, şifrelerinizi ve kart bilgilerinizi güvenli, düzenli ve kolay erişilebilir şekilde{' '}
            <Text style={[{ fontWeight: 'bold' }]}>saklamanızı</Text> sağlamaktır.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Tüm veriler cihazınızın içinde <Text style={[{ fontWeight: 'bold' }]}>şifrelenmiş biçimde</Text> depolanır ve uygulama{' '}
            <Text style={[{ fontWeight: 'bold' }]}>internete bağlanmaz</Text>. Bu sayede bilgileriniz{' '}
            <Text style={[{ fontWeight: 'bold' }]}>yalnızca sizin cihazınızda kalır</Text> ve hiçbir şekilde dışarı aktarılmaz.
          </Text>
        </View>

        <Divider style={stylesSettings.divider} bold />

        <View style={[stylesSettings.columnbox, { marginBottom: 10 }]}>
          <Text style={[{ fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>Kart Bilgileri Hakkında</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            <Text style={[{ fontWeight: 'bold' }]}>Kart şifresi (PIN):</Text> Zorunlu alandır ve cihazınızda{' '}
            <Text style={[{ fontWeight: 'bold' }]}>şifrelenerek</Text> saklanır.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            <Text style={[{ fontWeight: 'bold' }]}>Kart numarası, son kullanma tarihi (SKT) ve CVC:</Text> Bu alanlar{' '}
            <Text style={[{ fontWeight: 'bold' }]}>isteğe bağlıdır</Text> ve yalnızca{' '}
            <Text style={[{ fontWeight: 'bold' }]}>kopyalama kolaylığı</Text> sağlamak amacıyla saklanır. Ancak bu veriler{' '}
            <Text style={[{ fontWeight: 'bold' }]}>şifrelenmez</Text>.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Kart numarası, SKT ve CVC gibi bilgiler <Text style={[{ fontWeight: 'bold' }]}>hassas kabul edilir</Text>. Bu alanları doldurmadan önce{' '}
            <Text style={[{ fontWeight: 'bold' }]}>riskleri değerlendirmenizi</Text> ve cihazınızda{' '}
            <Text style={[{ fontWeight: 'bold' }]}>ek güvenlik önlemleri</Text> (ekran kilidi, biyometrik doğrulama vb.) kullanmanızı öneririz.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Uygulamayı indirerek bu bilgilendirmeyi <Text style={[{ fontWeight: 'bold' }]}>okuduğunuzu ve kabul ettiğinizi</Text> beyan etmiş olursunuz.
          </Text>
        </View>

        <Divider style={stylesSettings.divider} bold />

        <View style={[stylesSettings.columnbox, { marginBottom: 10 }]}>
          <Text style={[{ fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>Giriş Yöntemleri</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Uygulamaya giriş yaparken üç farklı yöntem arasından seçim yapabilirsiniz. Tercihinizi <Text style={[{ fontWeight: 'bold' }]}>Ayarlar</Text> bölümünden değiştirebilirsiniz:
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>• Şifresiz giriş (uygulama açıldığında doğrudan erişim)</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>• PIN ile giriş (sayısal kod ile koruma)</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>• Biyometrik giriş (parmak izi veya yüz tanıma, cihaz desteğine bağlı)</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Daha yüksek güvenlik için <Text style={[{ fontWeight: 'bold' }]}>PIN</Text> veya{' '}
            <Text style={[{ fontWeight: 'bold' }]}>biyometrik giriş</Text> yöntemini kullanmanız önerilir.
          </Text>
        </View>

        <Divider style={stylesSettings.divider} bold />

        <View style={[stylesSettings.columnbox, {}]}>
          <Text style={[{ fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>Açık Kaynak ve Katkı</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Uygulamamız <Text style={[{ fontWeight: 'bold' }]}>tamamen açık kaynak kodludur</Text>.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Projemizin kodlarını <Text style={[{ fontWeight: 'bold' }]}>GitHub sayfamızdan</Text> inceleyebilir, öneri veya katkılarınızı paylaşabilirsiniz.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Görüşlerinizi <Text style={[{ fontWeight: 'bold' }]}>GitHub Issues</Text> bölümü veya{' '}
            <Text style={[{ fontWeight: 'bold' }]}>Google Play yorumları</Text> aracılığıyla iletebilirsiniz.
          </Text>
        </View>

        <Divider style={stylesSettings.divider} bold />

        <View style={[stylesSettings.columnbox, {}]}>
          <Text style={[{ fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>Reklamsız Deneyim</Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Kullanıcı deneyimini ön planda tuttuğumuz için uygulamamızda <Text style={[{ fontWeight: 'bold' }]}>reklam bulunmamaktadır</Text>.
          </Text>
          <Text style={[{ fontSize: 15, lineHeight: 20 }]}>
            Amacımız, sizlere <Text style={[{ fontWeight: 'bold' }]}>sade, güvenli ve rahatsız etmeyen</Text> bir kullanım sunmaktır.
          </Text>
        </View>
      </Surface>

      <Surface style={[stylesSettings.surface]} elevation={5}>
        <Text variant='titleMedium'>Katkıda Bulunanlar</Text>
        <Divider style={[stylesSettings.divider, { marginBottom: 15 }]} />
        <View
          style={[
            stylesSettings.rowbox,
            {
              backgroundColor: colors?.onSecondary,
              padding: 5,
              borderRadius: 6,
              justifyContent: 'flex-start',
              marginBottom: 10
            }
          ]}
        >
          <Avatar.Icon size={34} icon="brain" style={[{ marginLeft: 5 }]} />
          <Text variant='titleMedium' style={[{ marginLeft: 10 }]}>Nazım Sucu</Text>
          <Text variant='titleSmall' style={[{ marginLeft: 'auto', marginRight: 5 }]}>- Developer</Text>
        </View>

        <View
          style={[
            stylesSettings.rowbox,
            {
              backgroundColor: colors?.onSecondary,
              padding: 5,
              borderRadius: 6,
              justifyContent: 'flex-start'
            }
          ]}
        >
          <Avatar.Icon size={34} icon="format-paint" style={[{ marginLeft: 5 }]} />
          <Text variant='titleMedium' style={[{ marginLeft: 10 }]}>Y. Kaan Vural</Text>
          <Text variant='titleSmall' style={[{ marginLeft: 'auto', marginRight: 5 }]}>- Designer</Text>
        </View>
      </Surface>

      <Surface style={[stylesSettings.surface, { marginBottom: 50 }]} elevation={5}>
        <Text variant='titleMedium'>Geliştirmek İçin</Text>
        <Divider style={[stylesSettings.divider, { marginBottom: 15 }]} />
        <View
          style={[
            stylesSettings.columnbox,
            {
              backgroundColor: colors?.onSecondary,
              padding: 10,
              borderRadius: 6,
              justifyContent: 'center',
              marginBottom: 10
            }
          ]}
        >
          <IconButton
            icon="github"
            mode='contained-tonal'
            iconColor={colors?.primary}
            size={50}
            onPress={() => Linking.openURL('https://github.com/nazms23/BankaSifreUygulamasi')}
          />
          <Text variant='titleSmall' style={[{ margin: 10 }]}>GitHub Linki</Text>
        </View>
      </Surface>
    </ScrollView>
  )
}

export default Bilgilendirme
