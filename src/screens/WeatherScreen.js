import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherScreen = () => {
  const [data, setData] = useState({});

  const API_key = '797224bcfbcb0b21363635cdf99ddbba';

  const fetchDatafromApi = async (lat, lon) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_key}&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('FETCH DATA', data);
        setData(data);
      });
  };

  useEffect(() => {
    fetchDatafromApi('41.8781', '-87.6298');
    console.log('USE EFFECT DATA', data);
  }, []);

  return (
    <View style={styles.layout}>
      <Text>Welcome</Text>
      {/* <Text>{data ? data.city.name : 'Loading!'}</Text> */}
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
