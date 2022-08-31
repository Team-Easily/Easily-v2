import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
const API_key = '797224bcfbcb0b21363635cdf99ddbba';

const Weather = () => {
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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDatafromApi('40.7128', '-74.0060');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDatafromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [loading]);

  useEffect(() => {
    data.city ? setLoading(false) : null;
  }, [data]);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.layout}>
          <View style={styles.weatherItemContainer}>
            <Text style={styles.title}>Today's Weather</Text>
            <Text style={styles.subtitle}>{data?.city.name}</Text>
            <Text>
              {data?.city.coord.lat}, {data?.city.coord.lon}
            </Text>
            <Text>Current Temperature: {data?.list[0].main.temp}°F</Text>
            <Text>Feels Like: {data?.list[0].main.feels_like}°F</Text>
            <Text>Humidity: {data?.list[0].main.humidity}% </Text>
            <Text>
              Current Conditions: {data?.list[0].weather[0].description}
            </Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItemContainer: {
    paddingTop: '10%',
    paddingHorizontal: 20,
  },
});

export default Weather;
