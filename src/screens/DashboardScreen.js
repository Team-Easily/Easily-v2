import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Headline } from 'react-native-paper';

export const DashboardScreen = () => <Headline>Dashboard</Headline>;

// export const DashboardScreen = () => {
//   return (
//     <View style={styles.layout}>
//       <Text style={styles.title}>Dashboard</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
