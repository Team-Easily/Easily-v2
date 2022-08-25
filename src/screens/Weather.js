import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';

const Weather = () => {
  let temp;
  let wind;

  getLocation().then((location) => {
    getWeather({
      // OpenWeather API key
      key: 'a48682a7c9d0a4b4ce11e3008110a934',
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      unit: 'metric',
    }).then(() => {
      let data = new showWeather();
      temp = data.temp;
      wind = data.wind;
    });
  });

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons size={48} name='weather-sunny' color={'#fff'} />
        <Text style={styles.tempText}>data</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>temp</Text>
        <Text style={styles.subtitle}>wind</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Weather;
