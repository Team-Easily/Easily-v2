import React, { useState } from 'react';
import {
  View,
  // TouchableOpacity,
  // Text,
  StyleSheet,
  // ScrollView,
  // SafeAreaView,
} from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
// import { Card } from 'react-native-paper';

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

const CalendarScreen = () => {
  // const [items, setItems] = useState({});

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          selectedDayBackgroundColor: '#07beb8',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#07beb8',
          textDisabledColor: '#d9e1e8',
          dotColor: '#8f3985',
          selectedDotColor: '#ffffff',
          arrowColor: '#000000',
          disabledArrowColor: '#d9e1e8',
          indicatorColor: 'blue',
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        hideArrows={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth: 200,
    // height: 200,
    borderRadius: 10,
    shadowColor: '#64646F',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 29,
  },
  calendar: {
    borderRadius: 10,
    borderColor: 'gray',
  },
});

export default CalendarScreen;
