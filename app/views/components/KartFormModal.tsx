import { View, ScrollView, Image, Dimensions, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Card, Modal, TextInput, Text } from 'react-native-paper'
import { KartSifreler } from '../../utils/models'
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

const screenWidth = Dimensions.get('window').width
const itemWidth = Math.min(100, screenWidth / 4)
const itemHeight = 60
const imageWidth = 70
const imageHeight = 35

const KartFormModal = ({ isModalOpen, setIsModalOpen, kart, setKart }: KartFormModalProps) => {
const { bankalar, setFunctions } = useContext(PasswordsContext)
const { showNotification } = useContext(NotificationContext)
const [value, setValue] = useState('')

return (
    <Modal style={stylesModals.modalView} visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={30}>
            <Card style={stylesModals.card}>
                <Text style={{ margin: 'auto', paddingBottom: 15, fontWeight: '900' }} variant='headlineMedium'>
                    {kart.id === 0 ? 'Yeni Şifre Oluştur' : 'Şifreyi Değiştir'}
                </Text>

                <TextInput
                    label="Kart Şifrenizi Giriniz"
                    value={kart.sifre}
                    onChangeText={(text) => setKart((prev) => ({ ...prev, sifre: text }))}
                    mode="outlined"
                    keyboardType='numeric'
                    style={stylesModals.input2}
                    maxLength={4}
                />

                <Text style={{ marginBottom: 5 }} variant='labelLarge'>Kaydır ve Banka Seç</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                    {bankalar.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => setKart((prev) => ({ ...prev, kart: item }))}
                            style={{
                                width: itemWidth,
                                height: itemHeight,
                                marginRight: 10,
                                borderWidth: kart.kart?.id === item.id ? 2 : 1,
                                borderColor: kart.kart?.id === item.id ? 'green' : '#bbb',
                                borderRadius: 6,
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
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
                    ))}
                </ScrollView>

                <TextInput
                    label="Açıklama Giriniz"
                    value={kart.aciklama}
                    onChangeText={(text) => setKart((prev) => ({ ...prev, aciklama: text }))}
                    mode="outlined"
                    style={[stylesModals.input2, { marginTop: 5 }]}
                    maxLength={50}
                />

                <TextInput
                    label="Kart Numarası Giriniz"
                    value={kart.kartNumarasi}
                    onChangeText={(text) => {
                        let cleaned = text.replace(/\D/g, '').slice(0, 16)
                        let formatted = cleaned.match(/.{1,4}/g)?.join(' ') || ''
                        setKart((prev) => ({ ...prev, kartNumarasi: formatted }))
                    }}
                    mode="outlined"
                    keyboardType='numeric'
                    style={stylesModals.input2}
                    maxLength={19}
                />

                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <TextInput
                        label="SKT Giriniz"
                        value={kart.kartSonKullanmaTarihi}
                        onChangeText={(text) => {
                            let cleaned = text.replace(/\D/g, '')
                            if (cleaned.length > 2) cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
                            setKart((prev) => ({ ...prev, kartSonKullanmaTarihi: cleaned.slice(0, 5) }))
                        }}
                        mode="outlined"
                        keyboardType='numeric'
                        style={[stylesModals.input2, { width: '45%' }]}
                        maxLength={5}
                    />
                    <TextInput
                        label="CVC Giriniz"
                        value={kart.kartCVC}
                        onChangeText={(text) => setKart((prev) => ({ ...prev, kartCVC: text }))}
                        mode="outlined"
                        keyboardType='numeric'
                        style={[stylesModals.input2, { width: '45%' }]}
                        maxLength={3}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Button
                        style={stylesModals.button}
                        mode="contained"
                        onPress={async () => {
                            if (!kart.kart) {
                                showNotification(NotificationType.Error, 'Banka seçiniz!')
                                return
                            }
                            if (!kart.sifre) {
                                showNotification(NotificationType.Error, 'Şifre alanı boş bırakılamaz!')
                                return
                            }
                            if (kart.sifre.length < 4) {
                                showNotification(NotificationType.Error, 'Şifreniz 4 karakterden oluşmalıdır!')
                                return
                            }

                            if (kart.id === 0) {
                                await setFunctions.setKartSifreEkle({ ...kart })
                                showNotification(NotificationType.Success, 'Yeni Şifre Eklendi')
                            } else {
                                await setFunctions.setKartSifreDegistir({ ...kart })
                                showNotification(NotificationType.Success, 'Bilgiler Değiştirildi')
                            }

                            setKart({} as KartSifreler)
                            setIsModalOpen(false)
                        }}
                    >
                        {kart.id === 0 ? 'Ekle' : 'Değiştir'}
                    </Button>

                    <Button style={stylesModals.button} mode="contained-tonal" onPress={() => setIsModalOpen(false)}>
                        Kapat
                    </Button>
                </View>
            </Card>
        </KeyboardAwareScrollView>
    </Modal>
)

}

export default KartFormModal
