import { View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'

interface BankaListItemProps {
    text: string
}

const BankaListItem = ({text}: BankaListItemProps) => {
    const {colors} = useTheme()


    return (

        <View style={[{flex:1}, {backgroundColor: colors?.background}]}>
            <Text>{text}</Text>
        </View>
  )
}

export default BankaListItem