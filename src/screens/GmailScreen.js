import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { handleSignoutClick } from '../components/GmailJS';
import { handleAuthClick } from '../components/GmailJS';

export const GmailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        style={{ marginTop: 15 }}
        icon='send'
        mode='contained'
        onPress={handleAuthClick}
        color='#07BEB8'
        contentStyle={{ height: 45 }}
        labelStyle={{ color: 'white', fontSize: 18 }}
      >
        Authenticate
      </Button>
      <Button
        style={styles.button}
        icon='hand-wave'
        mode='contained'
        onPress={handleSignoutClick}
        color='#90be6d'
        contentStyle={{ height: 45 }}
        labelStyle={{ color: 'white', fontSize: 16 }}
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: '25%',
    // flex: 1,
    // marginLeft: 40,
    // marginRight: 40,
    flexDirection: 'row',
  },
  button: {
    // minWidth: 180,
    // marginBottom: 15,
  },
});
