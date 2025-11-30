import { View, ScrollView, Image, Dimensions, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Card, Modal, TextInput, Text } from 'react-native-paper'
import { BankaSifre } from '../../utils/models'
import { PasswordsContext } from '../../utils/PasswordsContext'
import { stylesModals } from '../../utils/styles'
import { NotificationContext } from '../../utils/NotificationContext'
import { NotificationType } from '../../utils/types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface BankaFormModalProps {
isModalOpen: boolean
setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
banka: BankaSifre
setBanka: React.Dispatch<React.SetStateAction<BankaSifre>>
}

const screenWidth = Dimensions.get('window').width
const itemWidth = Math.min(100, screenWidth / 4)
const itemHeight = 60
const imageWidth = 70
const imageHeight = 35

const BankaFormModal = ({ isModalOpen, setIsModalOpen, banka, setBanka }: BankaFormModalProps) => {
const { bankalar, setFunctions } = useContext(PasswordsContext);
const { showNotification } = useContext(NotificationContext);
const [value, setValue] = useState(''); // Segmented Button valueları

return (
    <Modal style={stylesModals.modalView} visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={20}>
            <Card style={stylesModals.card}>
                <Text style={{ margin: 'auto', paddingBottom: 15, fontWeight: '900' }} variant='headlineMedium'>
                    {banka.id === 0 ? 'Yeni Şifre Oluştur' : 'Şifreyi Değiştir'}
                </Text>

                <TextInput
                    label="Banka Şifrenizi Giriniz"
                    value={banka.sifre}
                    onChangeText={(text) => setBanka((prev) => ({ ...prev, sifre: text }))}
                    mode="outlined"
                    keyboardType='numeric'
                    style={stylesModals.input}
                    maxLength={6}
                />

                <Text style={{ marginBottom: 5 }} variant='labelLarge'>Kaydır ve Banka Seç</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                    {bankalar.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                width: itemWidth,
                                height: itemHeight,
                                borderColor: banka.banka?.id === item.id ? 'green' : '#bbb',
                                borderWidth: banka.banka?.id === item.id ? 2 : 1,
                                marginRight: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 6,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Pressable
                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => setBanka(prev => ({ ...prev, banka: item }))}
                            >
                                {item.gorsel ? (
                                    <Image
                                        source={item.gorsel}
                                        style={{ width: imageWidth, height: imageHeight, resizeMode: 'contain' }}
                                    />
                                ) : (
                                    <Text>{item.bankaAdi}</Text>
                                )}
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>

                <View style={{ margin: 10 }}>
                    <Button style={stylesModals.button} mode="contained" onPress={async () => {
                        if (!banka.banka) {
                            showNotification(NotificationType.Error, "Banka seçiniz!")
                            return;
                        }
                        if (!banka.sifre) {
                            showNotification(NotificationType.Error, "Şifre alanı boş bırakılamaz!")
                            return;
                        }
                        if (banka.sifre.length < 6) {
                            showNotification(NotificationType.Error, "Şifreniz 6 karakterden oluşmalıdır!")
                            return;
                        }
                        if (banka.id === 0) {
                            await setFunctions.setBankaSifreEkle({ ...banka })
                            showNotification(NotificationType.Success, "Yeni Şifre Eklendi")
                        } else {
                            await setFunctions.setBankaSifreDegistir({ ...banka })
                            showNotification(NotificationType.Success, "Şifre Değiştirildi")
                        }

                        setBanka({} as BankaSifre)
                        setIsModalOpen(false)
                    }}>
                        {banka.id === 0 ? 'Ekle' : 'Değiştir'}
                    </Button>

                    <Button style={stylesModals.button} mode="contained-tonal" onPress={() => setIsModalOpen(false)}>Kapat</Button>
                </View>
            </Card>
        </KeyboardAwareScrollView>
    </Modal>
)

}

export default BankaFormModal
