import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import { Button, Card, IconButton, Modal, Portal, Surface, TextInput,Badge,Icon} from 'react-native-paper'
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

const BankaFormModal = ({ isModalOpen, setIsModalOpen, banka, setBanka }: BankaFormModalProps) => {
    const {bankalar, setFunctions} = useContext(PasswordsContext);
    const {showNotification} = useContext(NotificationContext);
    return (
            <Modal style={stylesModals.modalView}visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
                <Card style={stylesModals.card}>
                    <TextInput 
                        label={"Banka Şifrenizi Giriniz"}
                        value={banka.sifre}
                        onChangeText={(text) => setBanka((prev) => ({...prev, sifre: text}))}
                        mode="outlined"
                        keyboardType='numeric'
                        style={stylesModals.input}
                        maxLength={6}
                    />
              
                        <ScrollView style={stylesModals.scrollCont}
                            horizontal
                        >
                        
                            {
                                
                                bankalar.map((item, index) => (
                                    
                                    <Button 
                                        key={index} 
                                        style={[stylesModals.buttonBank,{backgroundColor:'#ffffffff',borderColor: banka.banka?.id === item.id ? 'green': 'black', borderWidth: banka.banka?.id === item.id? 2 : 1}]}
                                        onPress={() => setBanka((prev) => ({...prev, banka: item}))}
                                        >
                                        {
                                            item.gorsel ? 
                                            <Image style={{width: "99%", height: "100%", resizeMode: 'center'}} source={item.gorsel} /> 
                                            : 
                                            <Text>{item.bankaAdi}</Text>
                                            
                                        }
                                        
                                    </Button>
                                ))
                            }
                        
                    
                        </ScrollView>
                  

                    
                    <Card style={{margin: 10}}>
                     
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

                            await setFunctions.setBankaSifreEkle(banka)
                            setBanka({} as BankaSifre)
                            setIsModalOpen(false)
                        }}>Ekle</Button>
                           <Button style={stylesModals.button} mode="contained-tonal" onPress={() => setIsModalOpen(false)}>Kapat</Button>
                    </Card>
                </Card>
            </Modal>
    )
}

export default BankaFormModal