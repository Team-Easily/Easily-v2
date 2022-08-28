import { Title, Modal } from 'react-native-paper';

import { Image } from 'react-native';

export const Modals = (
  <Modal
    visible={modalVisible}
    onDismiss={hideModal}
    contentContainerStyle={styles.modalContainerStyle}
  >
    <Title style={styles.title}>{getModalText(user.points)}</Title>
    <Image
      style={styles.coffeeMaker}
      source={require('../assets/coffee-maker.gif')}
      // source={require(getModalImage(user.points))}
    />
  </Modal>
);
