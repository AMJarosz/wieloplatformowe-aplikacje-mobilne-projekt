import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

const AddScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Add Screen</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Hour"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Task name"
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#302f4b', // ustaw tło całego ekranu na kolor ciemnoszary
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    height: '60%',
    backgroundColor: '#141529', // ustaw kolor prostokąta na ciemnoniebieski
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30, // zaokrąglij rogi
    padding: 20, // dodaj wewnętrzny padding dla odstępów
  },
  text: {
    fontSize: 20,
    color: '#ffffff', // ustaw biały kolor tekstu
    marginBottom: 20, // odstęp od góry dla tekstu
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#302f4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddScreen;
