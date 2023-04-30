import React from 'react';
import { Portal, Card, Modal, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../utils';

export default function CustomModal(props: any) {

  const { isVisible, modalText, showIndicator, indicatorColors } = props;

  return (

    <Portal>
      <Modal visible={isVisible}>
        <Card style={{ width: '20%', flexDirection: 'column', alignSelf: 'center', paddingVertical: 20, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
          {showIndicator === true
            ? <ActivityIndicator animating={true} color={!indicatorColors ? colors.PRIMARY : indicatorColors} style={{ marginHorizontal: 12 }} />
            : null
          }
        </Card>
      </Modal>
    </Portal>

  )
}


