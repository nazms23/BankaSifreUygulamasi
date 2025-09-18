import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Portal } from 'react-native-paper'

interface PageLoadingProps {
    loading: boolean
}

const PageLoading = ({loading}: PageLoadingProps) => {
  return loading ?(    
    <Portal>
      <View style={[{flex:1, justifyContent:"center"}, {backgroundColor: 'rgba(146, 146, 146, 0.5)' }]}>
        <ActivityIndicator size="large" />
      </View>
    </Portal> 
  ) : null
}

export default PageLoading