import { FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'
import { decryptPassword, PasswordsContext } from '../../../utils/PasswordsContext'
import BankaFormModal from '../../components/BankaFormModal'
import { BankaSifre, SelectedMode } from '../../../utils/models'

const Banka = () => {
    const {secretKey, setFunctions} = useContext(PasswordsContext);
    const [isFabOpen, setIsFabOpen] = useState<boolean>(false)
    const [selectedMode, setSelectedMode] = useState<SelectedMode>(SelectedMode.None)
    const {colors} = useTheme();

    const {bankaSifreler, bankalar} = useContext(PasswordsContext);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [banka, setBanka] = useState<BankaSifre>({
      id: 0,
      sifre: '',
      banka: bankalar[0]
    });

  return (
    <>
      <FlatList 
          data={bankaSifreler}
          renderItem={(i) => <BankaListItem banka={i.item} selectedMode={selectedMode} onPress={() => {
            if(selectedMode === SelectedMode.Edit){
              const bankaSifre:BankaSifre = {...i.item, sifre: decryptPassword(i.item.sifre, secretKey)}
  
              setBanka(bankaSifre)
              setIsModalOpen(true)
              setSelectedMode(SelectedMode.None)
            }
            else if(selectedMode === SelectedMode.Delete){
              setSelectedMode(SelectedMode.None)
              setFunctions.setBankaSifreSil(i.item.id)
            }
            
          }} />}
          style={[{flex:0}, {backgroundColor: colors?.background} ] }
          contentContainerStyle={{padding:10,paddingBottom:10}}
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
            icon: "delete",
            label: 'Sil',
            onPress: () => setSelectedMode(SelectedMode.Delete),
          },
          {
            icon:  "circle-edit-outline",
            label: 'Düzenle',
            onPress: () => setSelectedMode(SelectedMode.Edit),
          }
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