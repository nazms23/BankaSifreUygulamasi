import { FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'
import { PasswordsContext } from '../../../utils/PasswordsContext'
import BankaFormModal from '../../components/BankaFormModal'
import { BankaSifre } from '../../../utils/models'

const Banka = () => {
    const [isFabOpen, setIsFabOpen] = useState<boolean>(false)
    const {colors} = useTheme();

    const {bankaSifreler} = useContext(PasswordsContext);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [banka, setBanka] = useState<BankaSifre>({} as BankaSifre);

    useEffect(() => {
      console.log(bankaSifreler)
    }, [bankaSifreler])

  return (
    <>
      <FlatList 
          data={bankaSifreler}
          renderItem={(i) => <BankaListItem banka={i.item} />}
          style={[{flex:0}, {backgroundColor: colors?.background} ] }
          contentContainerStyle={{padding:10,paddingBottom:10}}
      />
        
      <FAB.Group
        open={isFabOpen}
        visible
        icon={isFabOpen ? 'arrow-up' : 'plus'}
        actions={[
          { 
            icon: 'plus', onPress: () => {
              setBanka({} as BankaSifre)
              setIsModalOpen(true)
            } },
          {
            icon: "delete",
            label: 'Sil',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon:  "circle-edit-outline",
            label: 'Düzenle',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'delete-forever',
            label: 'Hepsini Sil',
            onPress: () => console.log('Pressed notifications'),
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