import "@expo/metro-runtime";
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarComp from './components/Calendar'; 
import AddScreen from './components/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({ //tutaj można dodać przycisk zmiany trybu, nawigacja przygotowana, wystarczy wymienić screeny
            ...headerOptions,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('name')}>
                {/* <Text style={{ color: '#fff' }}>Add</Text> */}
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#302f4b',
            },
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen 
          name="Back" 
          component={AddScreen} 
          options={headerOptions} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <CalendarComp />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Back')}>
        {/* <Text style={{ color: '#fff' }}>Add</Text> */}
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// Ustawienie koloru headera na każdym ekranie
const headerOptions = {
  headerStyle: {
    backgroundColor: '#302f4b',
  },
  headerTintColor: '#fff',
};

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
    borderRadius: 30, // połowa wartości width i height dla efektu okrągłości
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 3, // efekt cienia na Androidzie
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});