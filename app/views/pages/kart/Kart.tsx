import { View, Text, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import KartListItem from '../../components/KartListItem';
import { KartSifreler, SelectedMode } from '../../../utils/models';
import { decryptPassword, PasswordsContext } from '../../../utils/PasswordsContext';
import { NotificationType } from '../../../utils/types';
import { NotificationContext } from '../../../utils/NotificationContext';
import KartFormModal from '../../components/KartFormModal';

const Kart = () => {
    const {secretKey, setFunctions, kartSifreler, bankalar} = useContext(PasswordsContext);
    const {showNotification} = useContext(NotificationContext)
    const [isFabOpen, setIsFabOpen] = useState(false)
    const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.None)

    const {colors} = useTheme();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [kart, setKart] = useState<KartSifreler>({
        id: 0,
        kart: bankalar[0],
        sifre: "",
        aciklama: "",
        kartNumarasi: "",
        kartCVC: "",
        kartSonKullanmaTarihi: "",
    });

    return (
        <>
            <FlatList 
                data={kartSifreler}
                renderItem={(i) => 
                    <KartListItem 
                        key={i.index}
                        kart={i.item} 
                        onPress={() => {
                            if(selectedMode === SelectedMode.Edit){
                                const kartSifre:KartSifreler = {...i.item, sifre: decryptPassword(i.item.sifre, secretKey)}
                    
                                setKart(kartSifre)
                                setIsModalOpen(true)
                                setSelectedMode(SelectedMode.None)
                            }
                            else if(selectedMode === SelectedMode.Delete){
                                setSelectedMode(SelectedMode.None)
                                showNotification(NotificationType.Info, "Silmek İstediğinize Emin Misiniz?", true, () => {
                                setFunctions.setKartSifreSil(i.item.id)
                                })
                            }
                            
                        }}
                    selectedMode={selectedMode} />}
                style={[{flex:1}, {backgroundColor: colors?.background}] }
                contentContainerStyle={{padding:16,paddingBottom:60}}
            />
            <FAB.Group 
                open={isFabOpen}
                onStateChange={(open) => setIsFabOpen(open.open)}
                visible
                icon={'plus'}
                actions={[
                    { 
                        icon: 'plus', label: 'Ekle', onPress: () => {
                            setKart({
                                id: 0,
                                kart: bankalar[0],
                                sifre: "",
                                aciklama: "",
                                kartNumarasi: "",
                                kartCVC: "",
                                kartSonKullanmaTarihi: "",
                            })
                            setIsModalOpen(true)
                        } 
                    },
                    {
                    icon:  "circle-edit-outline",
                    label: 'Düzenle',
                    onPress: () => setSelectedMode(prev => prev === SelectedMode.Edit ? SelectedMode.None : SelectedMode.Edit),
                    },
                    {
                    icon: "delete",
                    label: 'Sil',
                    onPress: () => setSelectedMode(prev => prev === SelectedMode.Delete ? SelectedMode.None : SelectedMode.Delete),
                    },
                ]}
            />
            
            <KartFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} kart={kart} setKart={setKart}  />
        </>
    )
}

export default Kart