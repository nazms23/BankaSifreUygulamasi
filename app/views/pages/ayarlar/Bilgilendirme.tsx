import {View, ScrollView, ProgressBarAndroidComponent,Linking } from 'react-native'
import React, { useContext } from 'react'
import { Text , Surface, IconButton,Divider,useTheme,Avatar } from 'react-native-paper'
import { stylesSettings } from '../../../utils/styles'
import { MainContext } from '../../../utils/MainContext'
import { FontSizes, Theme } from '../../../utils/types'

const Bilgilendirme = () => {
  const {colors} = useTheme()
  const {settings,setFunctions} = useContext(MainContext)

  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={[stylesSettings.surface]} elevation={5}>
        <View style={[stylesSettings.columnbox,{alignItems: 'flex-start',marginBottom: 10}]}>
               <Text style={[{fontSize: 18,lineHeight: 28, fontWeight: 'bold'}]}>Uygulamamızın amacı ve Bilgilendirme,</Text>
               <Text style={[{fontSize: 15,lineHeight: 20}]}> şifrelerinizi güvenli bir şekilde bir arada tutmaktır. Uygulama, şifreleri kaydetmez veya saklamaz; sadece yönetmenize ve hatırlamanıza yardımcı olur. </Text> 
               <Text style={[{fontSize: 15,lineHeight: 20}]}> Şifrelerinizin güvenliği tamamen size aittir. Uygulamayı silerseniz, şifreleriniz de kalıcı olarak silinecektir. </Text>
               <Text style={[{fontSize: 15,lineHeight: 20}]}> Şifreleriniz hiçbir şekilde bulut ortamında saklanmaz; yalnızca cihazınızın yerel depolamasında tutulur.  </Text>
               <Text style={[{fontSize: 15,lineHeight: 20}]}> Uygulamamız internete bağlanmaz, bu nedenle verileriniz cihazınızdan dışarı çıkmaz ve hiçbir şekilde paylaşılmaz.</Text>
               <Divider  style={stylesSettings.divider}/>
               <Text style={[{fontSize: 18,textAlign:'center',fontWeight: '900'}]}>Uygulamayı indirerek bu bilgilendirmeyi okuduğunuzu ve kabul ettiğinizi beyan etmiş olursunuz.</Text>
        </View>
       
        <View style={[stylesSettings.columnbox,{marginBottom: 10}]}>
          <Text style={[{fontSize: 18,lineHeight: 28, fontWeight: 'bold'}]}>Uygulamamız tamamen açık kaynak kodludur.</Text>
          <Text style={[{fontSize: 15,lineHeight: 20}]}> Uygulamamıza katkıda bulunmak isterseniz, Uygulamamızın GitHub sayfasını ziyaret edebilirsiniz. Görüş ve önerileriniz için GitHub Konular kısmını veya GooglePlay Yorumları kullanabilirsiniz. </Text>
        </View>

        <View style={[stylesSettings.columnbox,{}]}>
          <Text style={[{fontSize: 18,lineHeight: 28, fontWeight: 'bold'}]}>Uygulamamız, kullanıcı deneyimini ön planda tuttuğu için reklamsızdır.</Text>  
          <Text style={[{fontSize: 15,lineHeight: 20}]}> Uygulamamızı beğendiyseniz yorum yapmayı ve paylaşmayı unutmayın. Teşekkür ederiz! : )</Text>
          
        </View>

      </Surface>
      <Surface style={[stylesSettings.surface]} elevation={5}>
        <Text variant='titleMedium'>Katkıda bulunanlar</Text>
        <Divider style={[stylesSettings.divider,{marginBottom: 15}]} />
        <View style={[stylesSettings.rowbox,{backgroundColor: colors?.onSecondary,padding: 5, borderRadius: 6, justifyContent: 'flex-start',marginBottom: 10}]}>
            <Avatar.Icon size={34} icon="brain" style={[{marginLeft: 5}]}/><Text variant='titleMedium'  style={[{marginLeft: 10}]}>Nazım Sucu</Text><Text variant='titleSmall' style={[{marginLeft: 'auto', marginRight: 5}]}>- Developer</Text>
          
        </View>
          <View style={[stylesSettings.rowbox,{backgroundColor: colors?.onSecondary,padding: 5, borderRadius: 6, justifyContent: 'flex-start'}]}>
            <Avatar.Icon size={34} icon="format-paint" style={[{marginLeft: 5}]}/><Text variant='titleMedium' style={[{marginLeft: 10}]}>Y. Kaan Vural</Text><Text variant='titleSmall'style={[{marginLeft: 'auto', marginRight: 5}]}>- Designer</Text>
          
        </View>
        
      </Surface>
            <Surface style={[stylesSettings.surface,{marginBottom: 50}]} elevation={5}>
        <Text variant='titleMedium'>Geliştirmek için</Text>
        <Divider style={[stylesSettings.divider,{marginBottom: 15}]} />
        <View style={[stylesSettings.columnbox,{backgroundColor: colors?.onSecondary,padding: 10, borderRadius: 6, justifyContent: 'center',marginBottom: 10}]}>
          <IconButton
            icon="github"
            mode='contained-tonal'
            iconColor={colors?.primary}
            size={50}
            onPress={() => Linking.openURL("https://github.com/nazms23/BankaSifreUygulamasi")}
          />
          <Text variant='titleSmall' style={[{margin:10}]}>GitHub Linki</Text>

        </View>
 
      </Surface>
     
    </ScrollView>
  )
}
export default Bilgilendirme
