import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTime from '../components/weather/DateTime';
import * as Location from 'expo-location';
const API_key = '797224bcfbcb0b21363635cdf99ddbba';

const WeatherScreen = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDatafromApi = async (latitude, longitude) => {
    if (latitude && longitude) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log('FETCH DATA', data);
          setData(data);
        });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (success) => {
        let { latitude, longitude } = success.cords;
        console.log(success.coords);
        await fetchDatafromApi(latitude, longitude);
      },
      (err) => {
        if (err) fetchDatafromApi('40.7128', '-74.0060');
        console.log('GEOLOCATION FAILED');
      },
      console.log('USE EFFECT DATA', data)
    );
  }, [loading]);

  useEffect(() => {
    data.city ? setLoading(false) : null;
  }, [data]);

  return (
    <View>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.layout}>
          <DateTime />
          <View style={styles.weatherItemContainer}>
            <Text style={styles.title}>Today's Weather</Text>
            <Text>{data?.city.name}</Text>
            <Text>Current Temperature: {data?.list[0].main.temp}°F</Text>
            <Text>Feels Like: {data?.list[0].main.feels_like}°F</Text>
            <Text>Min Temp: {data?.list[0].main.temp_min}°F</Text>
            <Text>Max Temp: {data?.list[0].main.temp_max}°F</Text>
            <Text>{data?.list[0].main.humidity}% </Text>
            <Text>{data?.list[0].weather[0].description}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#E8EAED',
    height: '100%',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  weatherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItemContainer: {
    paddingTop: '30%',
    paddingHorizontal: 20,
  },
});

export default WeatherScreen;
