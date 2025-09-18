import React, { createContext, ReactNode, useState } from 'react'
import { Button, Dialog, Icon, Portal, Text } from 'react-native-paper'
import { NotificationType } from './types'

interface NotificationContextType {
    showNotification: (type: NotificationType, description: string, useOkCancelButtons?: boolean, onOk?: () => void) => void
}
export const NotificationContext = createContext<NotificationContextType>({showNotification: () => {}})

export const NotificationContextProvider = ({children}: {children: ReactNode}) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false)
        setDescription("")
        setType(null)
        setUseOkCancelButtons(false)
        setOnOk(() => {})
    };

    const [description, setDescription] = useState("")
    const [useOkCancelButtons, setUseOkCancelButtons] = useState<boolean | undefined>(false)
    const [onOk, setOnOk] = useState<() => void>(() => {})
    const [type, setType] = useState<NotificationType | null>()

    function showNotification(type: NotificationType, description: string, useOkCancelButtons?: boolean, onOkFunction?: () => void) {
        setDescription(description)
        setType(type)
        setUseOkCancelButtons(useOkCancelButtons)
        setOnOk(() => onOkFunction)
        showDialog()
    }

    function handleOk() {
        hideDialog()
        onOk()
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
                    {
                        !useOkCancelButtons ?
                        <Button onPress={hideDialog}>Tamam</Button> :
                        <>
                            <Button onPress={hideDialog}>Iptal</Button>
                            <Button onPress={handleOk}>Tamam</Button>
                        </>
                    }
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </NotificationContext.Provider>
  )
}