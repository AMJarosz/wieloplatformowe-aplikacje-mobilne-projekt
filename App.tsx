import "@expo/metro-runtime";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import {Calendar, LocaleConfig } from 'react-native-calendars';

export default function App() {
  const dateNow = new Date();
  const currentDate = dateNow.toISOString().split('T')[0];
  const [selected, setSelected] = useState('');

  const customStyle = {
    container: {
      borderRadius: 2,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: 'transparent',
      height: '110%',
      width: '75%',
    },
    text: {
      fontWeight: 'bold',
    }
  }
  
  return (
    <View style={styles.calendarWrapper}>
      <Calendar
        style= {{
          borderRadius: 6,
          width: '100%',
          height: '100%',
        }}

        theme={{
          calendarBackground: '#141529',
          arrowColor: 'yellow',
          monthTextColor: 'white',
          dayTextColor: 'white',
        }}

        current={currentDate}

        onDayPress={day => {
          setSelected(day.dateString);
          console.log('selected day', day)
        }}
        markingType={'custom'}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#06ca88'},
          '2024-04-01': {selected: true, marked: true, customStyles: customStyle},
          '2024-04-02': {customStyles: customStyle},
          '2024-04-03': {selected: true, marked: true, customStyles: customStyle},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarWrapper: {
    width: '100%',
    backgroundColor: '#302f4b',
  },
});
