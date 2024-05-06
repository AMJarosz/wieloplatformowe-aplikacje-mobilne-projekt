import "@expo/metro-runtime";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { Calendar, CalendarContext, LocaleConfig } from 'react-native-calendars';

export default function CalendarComp() {
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
    return (<Calendar

        enableSwipeMonths={true}
        hideExtraDays={true}
        current={currentDate}

        style={{
            borderRadius: 6,
            width: '100%',
            height: '100%',
        }}

        theme={{
            calendarBackground: '#141529',
            arrowColor: 'white',
            monthTextColor: 'white',
            dayTextColor: 'white',
        }}

        onDayPress={day => {
            setSelected(day.dateString);
            console.log('selected day', day)
        }}
        markingType={'custom'}
        markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#06ca88' },
            '2024-04-01': { selected: true, marked: true, customStyles: customStyle },
            '2024-04-02': { customStyles: customStyle },
            '2024-04-03': { selected: true, marked: true, customStyles: customStyle },
        }}
    />)
}
