import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          selectedDayBackgroundColor: '#8f3985',
          textDayFontWeight: '400',
          textMonthFontWeight: '500',
          textMonthFontSize: 18,
          textDayHeaderFontWeight: '500',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          todayBackgroundColor: '#8f3985',
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
    paddingVertical: '40%',
    paddingHorizontal: '2rem',
    backgroundColor: '#ffffff',
  },
});

export default CalendarScreen;