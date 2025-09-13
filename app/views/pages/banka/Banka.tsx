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
            data={[]}
            renderItem={(i) => <BankaListItem text={i.item} />}
            style={[{flex:1}, {backgroundColor: colors?.background}] }
            contentContainerStyle={{padding:16,paddingBottom:60}}
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