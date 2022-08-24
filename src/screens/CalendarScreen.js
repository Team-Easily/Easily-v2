import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Headline } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import ApiCalendar from 'react-google-calendar-api';

    /**
     * List all events in the calendar
     * @param {number} maxResults to see
     * @param {string} calendarId to see by default use the calendar attribute
     * @returns {any} Promise with the result.
     */
   // public listUpcomingEvents(maxResults: number, calendarId: string = this.calendar): any

export const CalendarScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View style={styles.layout}>
      <Headline>Calendar</Headline>

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
