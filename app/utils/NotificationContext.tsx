import React, { createContext, ReactNode, useState } from 'react'
import { Button, Dialog, Icon, Portal, Text } from 'react-native-paper'
import { NotificationType } from './types'


interface NotificationContextType {
    showNotification: (type: NotificationType, description: string) => void
}

export const NotificationContext = createContext<NotificationContextType>({showNotification: () => {}})


export const NotificationContextProvider = ({children}: {children: ReactNode}) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [description, setDescription] = useState("")
    const [type, setType] = useState<NotificationType | null>()

    function showNotification(type: NotificationType, description: string) {
        setDescription(description)
        setType(type)
        showDialog()
    }

  return (
    <NotificationContext.Provider value={{showNotification}}>
        {children}
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title><Icon size={26} source={type == NotificationType.Error ? "alert-circle-outline" : type == NotificationType.Success ? "check-circle-outline" : "information-outline"} /> {type ?? ""}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{description}</Text>
                    </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Tamam</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </NotificationContext.Provider>
  )
}