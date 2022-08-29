import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const nav = useNavigation();

  return (
    <View style={styles.layout}>
      <Headline>Dashboard</Headline>
      {user ? (
        <View>
          <Text>{user.email}</Text>
          <Text>{user?.points}</Text>
          <Text>{user.userName}</Text>
        </View>
      ) : (
        'No user'
      )}
      <Button mode="contained" onPress={() => nav.navigate('Weather')}>
        Weather
      </Button>
    </View>
  );
};

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
