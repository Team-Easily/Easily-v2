import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

const SelectedModal = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const points = user.points;
  switch (true) {
    case points <= 4 || points > 15:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>
            You're doing great!
            <br /> Keep up the momentum!
          </Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/coffee-maker.gif')}
          />
        </View>
      );
    case points > 4 && points <= 7:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>
            Nice work!
            <br /> You deserve a break!
          </Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/koala-sleeping.gif')}
          />
        </View>
      );
    case points > 7 && points <= 9:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>Hooray! You rock!</Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/flags-garland.gif')}
          />
        </View>
      );
    case points > 9 && points <= 11:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>Look at you go!</Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/scooter.gif')}
          />
        </View>
      );
    case points > 11 && points <= 15:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>You're doing amazing!</Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/sunshine.gif')}
          />
        </View>
      );
    default:
      return (
        <View>
          <Title style={{ textAlign: 'center' }}>
            You're doing great!
            <br /> Keep up the momentum!
          </Title>
          <Image
            style={styles.coffeeMaker}
            source={require('../assets/coffee-maker.gif')}
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  coffeeMaker: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default SelectedModal;
