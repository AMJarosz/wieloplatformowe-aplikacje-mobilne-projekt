import "@expo/metro-runtime";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

export default function CalendarScreen({ navigation }) {
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
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                <Calendar
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
                        console.log('selected day', day);
                    }}
                    markingType={'custom'}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#06ca88' },
                        '2024-04-01': { selected: true, marked: true, customStyles: customStyle },
                        '2024-04-02': { customStyles: customStyle },
                        '2024-04-03': { selected: true, marked: true, customStyles: customStyle },
                    }}
                />
            </View>
            <TouchableOpacity //przycisk plusa
                style={styles.addButton}
                onPress={() => navigation.navigate('Add')}> 
                <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarWrapper: {
        flex: 1,
        backgroundColor: '#302f4b',
    },
    addButton: {
        backgroundColor: '#00FA9A',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});
