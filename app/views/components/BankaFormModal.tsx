import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import { Button, Card, Modal, Portal, TextInput } from 'react-native-paper'
import { BankaSifre } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import { stylesItems } from '../../utils/styles'
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
            <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
                <Card>
                    <TextInput 
                        label={"Şifre"}
                        value={banka.sifre}
                        onChangeText={(text) => setBanka((prev) => ({...prev, sifre: text}))}
                        mode="outlined"
                        keyboardType='numeric'
                        style={{margin: 10}}
                        maxLength={6}
                    />
                    <ScrollView
                        horizontal
                    >
                        {
                            bankalar.map((item, index) => (
                                <Button 
                                    key={index} 
                                    style={{flex: 1,display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: 5, width: 150, height: 50, borderStyle: 'solid', borderWidth: 1, borderColor: banka.banka?.id === item.id ? 'red' : 'black'}}
                                    onPress={() => setBanka((prev) => ({...prev, banka: item}))}
                                    >
                                    {
                                        item.gorsel ? 
                                        <Image style={{width: "90%", height: "90%", resizeMode: 'center'}} source={item.gorsel} /> 
                                        : 
                                        <Text>{item.bankaAdi}</Text>
                                    }
                                </Button>
                            ))
                        }
                    </ScrollView>
                    <Card style={{margin: 10}}>
                        <Button mode="contained-tonal" onPress={() => setIsModalOpen(false)}>Kapat</Button>
                        <Button mode="contained" onPress={async () => {
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
                    </Card>
                </Card>
            </Modal>
    )
}

export default BankaFormModal