import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import KartListItem from '../../components/KartListItem';

const Kart = () => {
    const [isFabOpen, setIsFabOpen] = useState(false)

    const {colors} = useTheme();

    return (
        <>
            <FlatList 
                data={[]}
                renderItem={(i) => <KartListItem text={i.item} />}
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

export default Kart