import { FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'
import { decryptPassword, PasswordsContext } from '../../../utils/PasswordsContext'
import BankaFormModal from '../../components/BankaFormModal'
import { BankaSifre, SelectedMode } from '../../../utils/models'
import { NotificationContext } from '../../../utils/NotificationContext'
import { NotificationType } from '../../../utils/types'

const Banka = () => {
    const {secretKey, setFunctions, bankaSifreler, bankalar} = useContext(PasswordsContext);
    const {showNotification} = useContext(NotificationContext)
    const [isFabOpen, setIsFabOpen] = useState<boolean>(false)
    const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.None)
    const {colors} = useTheme();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [banka, setBanka] = useState<BankaSifre>({
      id: 0,
      sifre: '',
      banka: bankalar[0]
    });

  return (
    <>
      <FlatList 
          data={bankaSifreler}
          renderItem={(i) => <BankaListItem key={i.index} banka={i.item} selectedMode={selectedMode} onPress={() => {
            if(selectedMode === SelectedMode.Edit){
              const bankaSifre:BankaSifre = {...i.item, sifre: decryptPassword(i.item.sifre, secretKey)}
  
              setBanka(bankaSifre)
              setIsModalOpen(true)
              setSelectedMode(SelectedMode.None)
            }
            else if(selectedMode === SelectedMode.Delete){
              setSelectedMode(SelectedMode.None)
              showNotification(NotificationType.Info, "Silmek İstediğinize Emin Misiniz?", true, () => {
                setFunctions.setBankaSifreSil(i.item.id)
              })
            }
          }} />}
          style={[{flex:0}, {backgroundColor: colors?.background} ] }
          contentContainerStyle={{padding:10,paddingBottom:120}}
      />
        
      <FAB.Group
        open={isFabOpen}
        visible
        icon={isFabOpen ? 'arrow-up' : 'plus'}
        actions={[
          { 
            icon: 'plus', label: 'Ekle', onPress: () => {
              setBanka({
                id: 0,
                sifre: '',
                banka: bankalar[0]
              })
              setIsModalOpen(true)
            } },
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
        onStateChange={({open}) => setIsFabOpen(open)}
        onPress={() => {
          if (isFabOpen) {
            // do something if the speed dial is open
          }
        }}
      />
      <BankaFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} banka={banka} setBanka={setBanka} />
    </>
  )
}

export default Banka