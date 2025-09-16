import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { FAB, Portal,Text, useTheme } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'

const Banka = () => {
    const [isFabOpen, setIsFabOpen] = useState(false)

    const {colors} = useTheme();
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;
  return (
    <>
        <FlatList 
            data={[1]}
            renderItem={(i) => <BankaListItem text={i.item} />}
            style={[{flex:0}, {backgroundColor: colors?.background} ] }
            contentContainerStyle={{padding:10,paddingBottom:10}}
        />
        
      
             <FAB.Group
          open={open}
          visible
          icon={open ? 'arrow-up' : 'plus'}
          actions={[
            { 
              icon: 'plus', onPress: () => console.log('Pressed add') },
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
              // do something if the speed dial is open
            }
          }}
        />
    </>
  )
}

export default Banka