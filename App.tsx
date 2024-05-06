import "@expo/metro-runtime";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarComp from './components/Calendar'; 

export default function App() {  
  return (
    <View style={styles.calendarWrapper}>
      <CalendarComp/>
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
