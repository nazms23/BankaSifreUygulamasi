import { View,ScrollView } from 'react-native'
import React from 'react'
import { Text , Surface, IconButton,Divider,Switch,Button,Tooltip } from 'react-native-paper'
import { stylesSettings } from '../../../utils/styles'
const GuvenlikAyarlar = () => {

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <ScrollView style={stylesSettings.setting}>
      <Surface style={stylesSettings.surface} elevation={5}>

        <Text  variant="titleMedium">Giriş Seçenekleri</Text>
        <Divider style={stylesSettings.divider} />
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Şifre ile giriş yap</Text>
          
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Parmak izi ile giriş yap</Text>
          
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>

      </Surface>
  
      <Surface style={stylesSettings.surface} elevation={5}>

        <Text  variant="titleMedium">Bildirim Ayarları</Text>
        <Divider style={stylesSettings.divider} />
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Bildirimlere izin ver</Text>
          
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
         <Tooltip  title="Şifrelerinin süresi yaklaştığında bildirim alacaksın!" enterTouchDelay={0} leaveTouchDelay={5500} >
        <View style={stylesSettings.switchbox} >
          <Text  variant="titleSmall">Süresi yaklaşan şifreler</Text>
           <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            
          
        </View>
        </Tooltip>
    
        

      </Surface>
      <Surface style={stylesSettings.surface} elevation={5}>

        <Text  variant="titleMedium">Şifre Ayarları</Text>
        <Divider style={stylesSettings.divider} />
        <View style={stylesSettings.rowbox} >
        
            <Button  style={stylesSettings.button} icon="key" mode="elevated" onPress={() => console.log('Pressed')}>
              Şifre değiştir
            </Button>
         
        </View>
       

      </Surface>

    </ScrollView>
    
  )
   


}


export default GuvenlikAyarlar