import React, { useState } from 'react'
import {Modal, FAB, Portal,Text, useTheme,Button, ModalProps } from 'react-native-paper'

import {stylesModals} from  '../../utils/styles'

const ModalC = ({ visible, setVisible }) => {
  const {colors} = useTheme()


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={stylesModals.modalView}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          <Button onPress={() => setVisible(false)} mode='contained'>Kapat</Button>
        </Modal>
  )
}

export default ModalC
