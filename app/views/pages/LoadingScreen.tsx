import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const LoadingScreen = () => {
    const {colors} = useTheme()

    return (
        <View style={[{flex:1, alignContent:"center", justifyContent:"center"}, {backgroundColor: colors.background}]}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}

export default LoadingScreen