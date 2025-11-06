import { View, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Card, IconButton, Modal, Portal, Surface, TextInput,Badge,Icon,Text,SegmentedButtons, SegmentedButtonsProps} from 'react-native-paper'
import { BankaSifre } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import { stylesModals } from '../../utils/styles'
import { NotificationContext } from '../../utils/NotificationContext'
import { NotificationType } from '../../utils/types'


interface BankaFormModalProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>

    banka: BankaSifre
    setBanka: React.Dispatch<React.SetStateAction<BankaSifre>>


}

const BankaFormModal = ({ isModalOpen, setIsModalOpen, banka, setBanka}: BankaFormModalProps) => {
    const {bankalar, setFunctions, bankaSifreler} = useContext(PasswordsContext);
    const {showNotification} = useContext(NotificationContext);
    const [value, setValue] = React.useState(''); //Segmented Button valueları
    return (
            <Modal style={stylesModals.modalView}visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
                <Card style={stylesModals.card}>
                    <Text style={{margin: 'auto',paddingBottom: 15,fontWeight:'900'}} variant='headlineMedium'>{banka.id == 0 ? 'Yeni Şifre Oluştur' : 'Şifreyi Değiştir'}</Text>
                    <TextInput 
                        label={"Banka Şifrenizi Giriniz"}
                        value={banka.sifre}
                        onChangeText={(text) => setBanka((prev) => ({...prev, sifre: text}))}
                        mode="outlined"
                        keyboardType='numeric'
                        style={stylesModals.input}
                        maxLength={6}
                    />
                        <Text style={{marginBottom: 5}} variant='labelLarge'>Kaydır ve Banka Seç</Text>
                        <ScrollView style={stylesModals.scrollCont} horizontal>
                            {
                                bankalar.map((item, index) => (
                                    
                                    <Button 
                                        key={index} 
                                        style={[stylesModals.buttonBank,{borderColor: banka.banka?.id === item.id ? 'green': 'black', borderWidth: banka.banka?.id === item.id? 2 : 1}]}
                                        onPress={() => setBanka((prev) => ({...prev, banka: item}))}
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
                        <Text style={{marginBottom: 10, marginTop: 10}} variant='labelLarge'>Şifre Yenileme Periyodu Seç</Text>
                        <SegmentedButtons
                            value={value}
                            onValueChange={setValue}
                            
                            density='regular'
                            buttons={[
                            {
                                value: 'twomonth',
                                label: '2 Ay',
                                checkedColor: '#388E3C',
                                showSelectedCheck: true,
                            },
                            {
                                value: 'sixmonth',
                                label: '6 Ay',
                                checkedColor: '#388E3C',
                                showSelectedCheck: true,
                            },
                            {   value: 'twelvemonth', 
                                label: '12 Ay',
                                checkedColor: '#388E3C',
                                showSelectedCheck: true,
                            }
                            
                            ]}
                        />

                    
                    <View style={{margin: 10}}>
                     
                        <Button style={stylesModals.button} mode="contained" onPress={async () => {
                            if(!banka.banka)
                            {
                                showNotification(NotificationType.Error, "Banka seçiniz!")
                                return;
                            }

                            if(!banka.sifre)
                            {
                                showNotification(NotificationType.Error, "Şifre giriniz!")
                                return;
                            }
                            
                            if(banka.sifre.length < 6)
                            {
                                showNotification(NotificationType.Error, "Şifreniz 6 karakterden oluşmalıdır!")
                                return;
                            }

                            if(banka.id == 0)
                            {
                                await setFunctions.setBankaSifreEkle({...banka})
                                showNotification(NotificationType.Success, "Şifre Eklendi")
                            }
                            else
                            {
                                await setFunctions.setBankaSifreDegistir({...banka})
                                showNotification(NotificationType.Success, "Şifre Değiştirildi")
                            }

                            setBanka({} as BankaSifre)
                            setIsModalOpen(false)
                        }}>{banka.id == 0 ? 'Ekle' : 'Değiştir'}</Button>
                           <Button style={stylesModals.button} mode="contained-tonal" onPress={() => setIsModalOpen(false)}>Kapat</Button>
                    </View>
                </Card>
            </Modal>
    )
}

export default BankaFormModal