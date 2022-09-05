import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export const RewardBadge = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const points = user.points;
  switch (true) {
    case points <= 4:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/coffee-maker.png')}
          />
        </View>
      );
    case points > 4 && points <= 7:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/koala-sleeping.png')}
          />
        </View>
      );
    case points > 7 && points <= 9:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/flags-garland.png')}
          />
        </View>
      );
    case points > 9 && points <= 11:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/scooter.png')}
          />
        </View>
      );
    case points > 11:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/sunshine.png')}
          />
        </View>
      );
    default:
      return (
        <View>
          <Image
            style={styles.badge}
            source={require('../../assets/coffee-maker.png')}
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  badge: {
    width: 75,
    height: 75,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    shadowColor: '#64646F',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
  },
});
