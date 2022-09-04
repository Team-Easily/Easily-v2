import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../components/events/events';
import { Headline, Title, List } from 'react-native-paper';
import moment from 'moment';

export const EventsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.uid) {
      const fetchEventsFromCalendar = async () => {
        try {
          let timeMin = new Date().toISOString();
          let apiKey = 'AIzaSyBWu0w9cYaNXv2bGEf0dUOWNUdGwwoRREw';
          let uri = `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${timeMin}&key=${apiKey}`;

          const res = await fetch(uri, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: `application/json`,
            },
          });
          const data = await res.json();
          const events = data.items;
          const eventsArr = [];
          events.map((event, i) => {
            eventsArr.push(event);
            const start = event.start.dateTime || event.start.date;
          });

          dispatch(setEvents(eventsArr));
        } catch (error) {
          console.log(error);
        }
      };
      fetchEventsFromCalendar();
    }
  }, [user]);

  const details = (event) => {
    const start = event.start.dateTime || event.start.date;
    const momentDate = moment(start);
    return momentDate.format('llll');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {events.length !== 0 ? (
          <View>
            <Headline style={styles.headline}>Upcoming Appointments</Headline>

            {!!events.length &&
              events.map((event) => {
                return (
                  <List.Item
                    key={event.id}
                    title={event.summary}
                    description={details(event)}
                    left={(props) => (
                      <List.Icon {...props} icon='calendar-clock' />
                    )}
                  />
                );
              })}
          </View>
        ) : (
          <View>
            <Headline style={styles.headline}>
              No appointments to show.
            </Headline>
            <Title style={styles.headline}>Did you Login with Google?</Title>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollView: {
    marginHorizontal: 10,
  },
  headline: {
    width: '100%',
    textAlign: 'center',
    marginTop: '1.5rem',
  },
});
