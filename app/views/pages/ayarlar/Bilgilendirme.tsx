import { View, ScrollView, Linking } from 'react-native';
import React from 'react';
import {
  Text,
  Surface,
  IconButton,
  Divider,
  useTheme,
  Avatar,
  Button,
} from 'react-native-paper';
import { stylesSettings } from '../../../utils/styles';

const Bilgilendirme = () => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[
        stylesSettings.setting,
        { backgroundColor: colors.surfaceVariant },
      ]}
    >
      {/* -------------- GENEL BİLGİLENDİRME -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          {
            borderRadius: 16,
            marginVertical: 10,
            padding: 16,
          },
        ]}
        elevation={2}
      >
        <View
          style={[
            stylesSettings.columnbox,
            { alignItems: 'center', marginBottom: 10 },
          ]}
        >
          <Text
            variant="titleLarge"
            style={{ fontWeight: 'bold', marginBottom: 6, textAlign: 'center' }}
          >
            Uygulamanın Amacı ve Bilgilendirme
          </Text>
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: colors.primary,
              borderRadius: 3,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
            Uygulamamızın amacı, şifrelerinizi ve kart bilgilerinizi güvenli,
            düzenli ve kolay erişilebilir şekilde{' '}
            <Text style={{ fontWeight: 'bold' }}>saklamanızı</Text> sağlamaktır.
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
            Tüm veriler cihazınızın içinde{' '}
            <Text style={{ fontWeight: 'bold' }}>şifrelenmiş biçimde</Text>{' '}
            depolanır ve uygulama{' '}
            <Text style={{ fontWeight: 'bold' }}>internete bağlanmaz</Text>. Bu
            sayede bilgileriniz{' '}
            <Text style={{ fontWeight: 'bold' }}>
              yalnızca sizin cihazınızda kalır
            </Text>{' '}
            ve hiçbir şekilde dışarı aktarılmaz.
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22 }}>
            Uygulamamız internete bağlanmaz, bu nedenle verileriniz cihazınızdan
            dışarı çıkmaz ve hiçbir şekilde paylaşılmaz.
          </Text>
        </View>
      </Surface>

      {/* -------------- KART BİLGİLERİ -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          { borderRadius: 16, marginVertical: 10, padding: 16 },
        ]}
        elevation={2}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="credit-card-lock-outline" size={22} />
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
            Kart Bilgileri Hakkında
          </Text>
        </View>
        <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: colors.primary,
              borderRadius: 3,
              marginBottom: 10,
            }}
          />

        <View
          style={{
            backgroundColor: colors.surfaceVariant,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>Kart şifresi (PIN): </Text>
            Zorunlu alandır ve cihazınızda{' '}
            <Text style={{ fontWeight: 'bold' }}>şifrelenerek</Text> saklanır.
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>
              Kart numarası, son kullanma tarihi (SKT) ve CVC:
            </Text>{' '}
            Bu alanlar isteğe bağlıdır ve yalnızca{' '}
            <Text style={{ fontWeight: 'bold' }}>kopyalama kolaylığı</Text>{' '}
            sağlamak amacıyla saklanır. Ancak bu veriler{' '}
            <Text style={{ fontWeight: 'bold' }}>şifrelenmez</Text>.
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 22 }}>
            Uygulamayı indirerek bu bilgilendirmeyi{' '}
            <Text style={{ fontWeight: 'bold' }}>
              okuduğunuzu ve kabul ettiğinizi
            </Text>{' '}
            beyan etmiş olursunuz.
          </Text>
        </View>
      </Surface>

      {/* -------------- AÇIK KAYNAK -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          { borderRadius: 16, marginVertical: 10, padding: 16 },
        ]}
        elevation={2}
      >
        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', marginBottom: 6 }}
        >
          Açık Kaynak ve Katkı
        </Text>
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.primary,
            borderRadius: 3,
            marginBottom: 10,
          }}
        />
        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
          Uygulamamız{' '}
          <Text style={{ fontWeight: 'bold' }}>tamamen açık kaynak kodludur</Text>.
        </Text>
        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
          İsterseniz projemizin kodlarını{' '}
          <Text style={{ fontWeight: 'bold' }}>GitHub sayfamızdan</Text>{' '}
          inceleyebilir, önerilerinizi veya katkılarınızı paylaşabilirsiniz.
        </Text>
        <Text style={{ fontSize: 15, lineHeight: 22 }}>
          Görüşlerinizi{' '}
          <Text style={{ fontWeight: 'bold' }}>GitHub Konular (Issues)</Text>{' '}
          bölümü veya{' '}
          <Text style={{ fontWeight: 'bold' }}>Google Play yorumları</Text>{' '}
          üzerinden iletebilirsiniz.
        </Text>
      </Surface>

      {/* -------------- REKLAMSIZ DENEYİM -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          { borderRadius: 16, marginVertical: 10, padding: 16 },
        ]}
        elevation={2}
      >
        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', marginBottom: 6 }}
        >
          Reklamsız Deneyim
        </Text>
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.primary,
            borderRadius: 3,
            marginBottom: 10,
          }}
        />
        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 6 }}>
          Kullanıcı deneyimini ön planda tuttuğumuz için uygulamamızda{' '}
          <Text style={{ fontWeight: 'bold' }}>reklam bulunmamaktadır</Text>.
        </Text>
        <Text style={{ fontSize: 15, lineHeight: 22 }}>
          Amacımız, sizlere{' '}
          <Text style={{ fontWeight: 'bold' }}>
            sade, güvenli ve rahatsız etmeyen
          </Text>{' '}
          bir kullanım sunmaktır.
        </Text>
      </Surface>

      {/* -------------- KATKIDA BULUNANLAR -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          { borderRadius: 16, marginVertical: 10, padding: 16 },
        ]}
        elevation={2}
      >
        <Text variant="titleLarge" style={{ fontWeight: 'bold', marginBottom: 6 }}>
          Katkıda Bulunanlar
        </Text>
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.primary,
            borderRadius: 3,
            marginBottom: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surfaceVariant,
            padding: 10,
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <Avatar.Icon size={40} icon="brain" />
          <View style={{ marginLeft: 10 }}>
            <Text variant="titleMedium">Nazım Sucu</Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              - Developer
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surfaceVariant,
            padding: 10,
            borderRadius: 12,
          }}
        >
          <Avatar.Icon size={40} icon="format-paint" />
          <View style={{ marginLeft: 10 }}>
            <Text variant="titleMedium">Y. Kaan Vural</Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              - Designer
            </Text>
          </View>
        </View>
      </Surface>

      {/* -------------- GITHUB LINK -------------- */}
      <Surface
        style={[
          stylesSettings.surface,
          { borderRadius: 16, marginVertical: 10, padding: 16, marginBottom: 50 },
        ]}
        elevation={2}
      >
        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', marginBottom: 6 }}
        >
          Geliştirmeye Katılın
        </Text>
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.primary,
            borderRadius: 3,
            marginBottom: 10,
          }}
        />

        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.surfaceVariant,
            padding: 16,
            borderRadius: 10,
          }}
        >
          <Button
            icon="github"
            mode="contained-tonal"
            onPress={() =>
              Linking.openURL('https://github.com/nazms23/BankaSifreUygulamasi')
            }
          >
            GitHub Sayfasını Aç
          </Button>
          <Text variant="bodySmall" style={{ marginTop: 8 }}>
            Projenin kaynak kodlarına buradan ulaşabilirsiniz.
          </Text>
        </View>
      </Surface>
    </ScrollView>
  );
};

export default Bilgilendirme;