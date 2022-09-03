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
          // console.log('FETCH DATA', data);
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
              <MaterialCommunityIcons
                size={55}
                name={WeatherConditions[data?.list[0].weather[0].main].icon}
                color={'#fff'}
              />
              <Text style={styles.tempText}>
                {Math.round(data?.list[0].main.temp)}˚
              </Text>
            </View>
            <View style={styles.weatherRow2}>
              <Title style={styles.city}>{data?.city.name}</Title>
              <Title style={styles.description}>
                {data?.list[0].weather[0].description}
              </Title>
            </View>
            <View style={styles.weatherRow3}>
              <Text style={styles.bottomRowText}>
                Feels Like: {Math.round(data?.list[0].main.feels_like)}°F
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  size={20}
                  name={'water-percent'}
                  color={'#fff'}
                />
                <Text style={styles.bottomRowText}>
                  {data?.list[0].main.humidity}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    paddingTop: 15,
    paddingHorizontal: 25,
    paddingBottom: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#64646F',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 29,
  },
  loading: {
    padding: 25,
    marginBottom: 40,
  },
  tempText: {
    fontSize: 45,
    color: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 'auto',
    color: '#fff',
  },
  weatherRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    color: '#fff',
  },
  weatherRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 15,
    color: '#fff',
    marginTop: 20,
  },
  fontColor: {
    color: '#fff',
  },
  city: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  description: {
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'right',
    fontSize: 15,
    lineHeight: 18,
  },
  bottomRowText: {
    color: '#fff',
    fontSize: 15,
  },
  weatherItemContainer: {
    flexDirection: 'column',
  },
});

export default Weather;
