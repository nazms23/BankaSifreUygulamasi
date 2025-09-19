import { FlatList,View } from 'react-native'
import React, { useState } from 'react'
import { FAB, Portal,Text, useTheme,Button } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'
import ModalC from '../../components/Modal'
import {stylesModals} from  '../../../utils/styles'
const Banka = () => {
    const [isFabOpen, setIsFabOpen] = useState(false)

    const {colors} = useTheme();
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
    const [visible, setVisible] = useState(false)
    const { open } = state;

  return (
    <>
        <FlatList 
            data={[1]}
            renderItem={(i) => <BankaListItem text={i.item} />}
            style={[{flex:0}, {backgroundColor: colors?.background} ] }
            contentContainerStyle={{padding:10,paddingBottom:10}}
        />
        <ModalC visible={visible} setVisible={setVisible} />
      
        <FAB.Group
          open={open}
          visible
          icon={open ? 'arrow-up' : 'plus'}
          actions={[
            { 
              icon: 'plus', onPress: () =>setVisible(true)},
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
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              
            }
          }}
        />
    </>
  )
}

export default Banka