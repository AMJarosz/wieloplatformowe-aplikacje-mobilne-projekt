import "@expo/metro-runtime";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './components/Calendar'; 
import AddScreen from './components/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={({ navigation }) => ({ //tutaj można dodać przycisk zmiany trybu, nawigacja przygotowana, wystarczy wymienić screeny
            ...headerOptions,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Add')}>
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
          name="Add" 
          component={AddScreen} 
          options={headerOptions} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Ustawienie koloru headera na każdym ekranie
const headerOptions = {
  headerStyle: {
    backgroundColor: '#302f4b',
  },
  headerTintColor: '#fff',
};
