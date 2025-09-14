import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { FAB, Portal,Text, useTheme } from 'react-native-paper'
import BankaListItem from '../../components/BankaListItem'

const Banka = () => {
    const [isFabOpen, setIsFabOpen] = useState(false)

    const {colors} = useTheme();

  return (
    <>
        <FlatList 
            data={[1]}
            renderItem={(i) => <BankaListItem text={i.item} />}
            style={[{flex:0}, {backgroundColor: colors?.background} ] }
            contentContainerStyle={{padding:10,paddingBottom:10}}
        />
        

        <FAB.Group 
            open={isFabOpen}
            onStateChange={(open) => setIsFabOpen(open.open)}
            visible
            icon={'plus'}
            actions={[]}
        />
    </>
  )
}

export default Banka