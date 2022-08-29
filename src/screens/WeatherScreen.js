import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherScreen = () => {
  const [data, setData] = useState({});

  const API_key = '797224bcfbcb0b21363635cdf99ddbba';

  const fetchDatafromApi = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let { lat, lon } = success.coords;
        fetchDatafromApi(lat, lon);
      },
      (err) => {
        //will just show NYC data as default
        if (err) fetchDatafromApi('40.7128', '-74.0060');
      }
    );
  }, []);

  return (
    <View style={styles.layout}>
      <Text>Welcome</Text>
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

export default WeatherScreen;
