import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WeatherConditions } from '../utils/WeatherConditions';

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
          console.log(data);
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
        <ActivityIndicator
          style={styles.loading}
          animating={true}
          color={'#90be6d'}
          size={'large'}
        />
      ) : (
        <View
          style={[
            styles.weatherContainer,
            {
              backgroundColor:
                WeatherConditions[data?.list[0].weather[0].main].color,
            },
          ]}
        >
          <View style={styles.weatherItemContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {Math.round(data?.list[0].main.temp)}˚
              </Text>
              <MaterialCommunityIcons
                size={90}
                name={WeatherConditions[data?.list[0].weather[0].main].icon}
                color={'#fff'}
              />
            </View>
            <View style={styles.weatherRow2}>
              <Text style={styles.feelsLike}>
                Feels Like: {Math.round(data?.list[0].main.feels_like)}°F
              </Text>
              <Title style={styles.description}>
                {data?.list[0].weather[0].description}
              </Title>
            </View>
            <View style={styles.weatherRow3}>
              <View style={styles.rhRow}>
                <MaterialCommunityIcons
                  size={30}
                  name={'water-percent'}
                  color={'#fff'}
                />
                <Text style={styles.humidity}>
                  {data?.list[0].main.humidity}% RH
                </Text>
              </View>
              <Text style={styles.city}>{data?.city.name}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    paddingTop: '60%',
    paddingBottom: '100%',
    paddingHorizontal: '3rem',
    justifyContent: 'center',
    height: '100%',
  },
  loading: {
    paddingTop: '10rem',
  },
  tempText: {
    fontSize: 80,
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  weatherRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    color: '#fff',
    marginVertical: '2rem',
  },
  weatherRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    color: '#fff',
    marginTop: 20,
  },
  rhRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontColor: {
    color: '#fff',
  },
  city: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  description: {
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: 22,
    lineHeight: 25,
  },
  humidity: {
    color: '#fff',
    fontSize: 18,
  },
  feelsLike: {
    color: '#fff',
    fontSize: 17,
  },
  weatherItemContainer: {
    flexDirection: 'column',
  },
});

export default Weather;
