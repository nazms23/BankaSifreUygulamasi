import { View, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Card, IconButton, Modal, Portal, Surface, TextInput,Badge,Icon,Text,SegmentedButtons, SegmentedButtonsProps} from 'react-native-paper'
import { BankaSifre, KartSifreler } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import { stylesModals } from '../../utils/styles'
import { NotificationContext } from '../../utils/NotificationContext'
import { NotificationType } from '../../utils/types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


interface KartFormModalProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>

    kart: KartSifreler
    setKart: React.Dispatch<React.SetStateAction<KartSifreler>>


}

const KartFormModal = ({ isModalOpen, setIsModalOpen, kart, setKart}: KartFormModalProps) => {
    const {bankalar, setFunctions, bankaSifreler} = useContext(PasswordsContext);
    const {showNotification} = useContext(NotificationContext);
    const [value, setValue] = React.useState(''); //Segmented Button valueları
    return (
            <Modal style={stylesModals.modalView}visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={30}
                >
                    <Card style={stylesModals.card}>

                            <Text style={{margin: 'auto',paddingBottom: 15,fontWeight:'900'}} variant='headlineMedium'>{kart.id == 0 ? 'Yeni Şifre Oluştur' : 'Şifreyi Değiştir'}</Text>
                            <TextInput 
                                label={"Kart Şifrenizi Giriniz"}
                                value={kart.sifre}
                                onChangeText={(text) => setKart((prev) => ({...prev, sifre: text}))}
                                mode="outlined"
                                keyboardType='numeric'
                                style={stylesModals.input2}
                                maxLength={4}
                            />
                            <Text style={{marginBottom: 5}} variant='labelLarge'>Kaydır ve Banka Seç</Text>
                            <ScrollView style={stylesModals.scrollCont} horizontal>
                                {
                                    bankalar.map((item, index) => (
                                        
                                        <Button 
                                            key={index} 
                                            
                                            style={[stylesModals.buttonBank,{borderColor: kart.kart?.id === item.id ? 'green': 'black', borderWidth: kart.kart?.id === item.id? 2 : 1}]}
                                            onPress={() => setKart((prev) => ({...prev, kart: item}))}
                                            >
                                            {
                                                item.gorsel ? 
                                                <Image style={{width: "90%", height: "100%", resizeMode: 'center'}} source={item.gorsel} /> 
                                                : 
                                                <Text>{item.bankaAdi}</Text>
                                            }
                                         
                                        </Button>
                                    ))
                                }
                            </ScrollView>
                          
                            <TextInput 
                                label={"Açıklama Giriniz"}
                                value={kart.aciklama}
                                onChangeText={(text) => setKart((prev) => ({...prev, aciklama: text}))}
                                mode="outlined"
                                style={[stylesModals.input2,{marginTop: 5}]}
                                maxLength={50}
                            />
                            <TextInput 
                                label={"Kart Numarası Giriniz"}
                                value={kart.kartNumarasi}
                                onChangeText={(text) => {
                                    let cleaned = text.replace(/\D/g, "");

                                    cleaned = cleaned.slice(0, 16);

                                    let formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";

                                    setKart((prev) => ({...prev, kartNumarasi: formatted}))
                                }}
                                mode="outlined"
                                keyboardType='numeric'
                                style={stylesModals.input2}
                                maxLength={19}
                            />
                            <View style={{flexDirection: 'row-reverse',justifyContent: 'space-between'}}>
                                <TextInput 
                                    label={"SKT Giriniz"}
                                    value={kart.kartSonKullanmaTarihi}
                                    onChangeText={(text) => {
                                        let cleaned = text.replace(/\D/g, "");

                                        if (cleaned.length > 2) {
                                        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
                                        }

                                        setKart((prev) => ({...prev, kartSonKullanmaTarihi: cleaned.slice(0, 5)}))
                                    }}
                                    mode="outlined"
                                    keyboardType='numeric'
                                   style={[stylesModals.input2,{width:'45%'}]}
                                    maxLength={5}
                                />
                                <TextInput 
                                    label={"CVV Giriniz"}
                                    value={kart.kartCVC}
                                    onChangeText={(text) => setKart((prev) => ({...prev, kartCVC: text}))}
                                    mode="outlined"
                                    keyboardType='numeric'
                                    style={[stylesModals.input2,{width:'45%'}]}
                                    maxLength={3}
                                />
                            </View>

                            
                            <View style={{marginTop: 10}}>
                            
                                <Button style={stylesModals.button} mode="contained" onPress={async () => {
                                    if(!kart.kart)
                                    {
                                        showNotification(NotificationType.Error, "Banka seçiniz!")
                                        return;
                                    }

                                    if(!kart.sifre)
                                    {
                                        showNotification(NotificationType.Error, "Şifre alanı boş bırakılamaz!")
                                        return;
                                    }
                                    
                                    if(kart.sifre.length < 4)
                                    {
                                        showNotification(NotificationType.Error, "Şifreniz 4 karakterden oluşmalıdır!")
                                        return;
                                    }

                                    if(kart.id == 0)
                                    {
                                        await setFunctions.setKartSifreEkle({...kart})
                                        showNotification(NotificationType.Success, "Yeni Şifre Eklendi")
                                    }
                                    else
                                    {
                                        await setFunctions.setKartSifreDegistir({...kart})
                                        showNotification(NotificationType.Success, "Bilgiler Değiştirildi")
                                    }

                                    setKart({} as KartSifreler)
                                    setIsModalOpen(false)
                                }}>{kart.id == 0 ? 'Ekle' : 'Değiştir'}</Button>
                                <Button style={stylesModals.button} mode="contained-tonal" onPress={() => setIsModalOpen(false)}>Kapat</Button>
                            </View>
                    </Card>
                </KeyboardAwareScrollView>
            </Modal>
    )
}

export default KartFormModal