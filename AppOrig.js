import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Login from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import store from './src/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor='#4F6D7A' />
          <Text style={styles.welcome}>Welcome to Easily!</Text>
          {/* <Button> "Lets Get Started"</Button> */}
          <Login />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#black',
  },
  // button: {
  //   button: {
  //     width: "90%",
  //     height: 50,
  //     borderRadius: 30,
  //     shadowColor: "black",
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 2,
  //     elevation: 2,
  //     alignSelf: "center",
  //     justifyContent: "center",
  //     textAlign: "center",
  //     alignItems: "center",
  //     marginTop: 15,
  //     backgroundColor: "#3B5999",
  //   },
  // },
});