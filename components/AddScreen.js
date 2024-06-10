import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Feather } from '@expo/vector-icons';

const AddScreen = ({ route, navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    if (route.params?.task) {
      // Editing an existing task
      const { name, date, hour } = route.params.task;
      setTaskName(name);
      setDate(date);
      setHour(hour);
    } else {
      // Adding a new task
      const currentDate = new Date().toISOString().split('T')[0];
      setDate(route.params?.selectedDate || currentDate);
      console.log('Current or selected date:', route.params?.selectedDate || currentDate);
    }
  }, [route.params]);

  const handleConfirmDate = (date) => {
    setDate(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleConfirmTime = (time) => {
    setHour(time.toTimeString().split(' ')[0].substring(0, 5));
    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const saveTask = () => {
    if (!taskName || !date || !hour) {
      // Alert the user if any input is empty
      Alert.alert('Incomplete Task', 'Please fill in all fields to save the task.');
      return;
    }

    if (route.params?.task) {
      // If editing existing task
      const editedTask = {
        ...route.params.task,
        name: taskName,
        date,
        hour,
      };
      navigation.navigate('Calendar', { editedTask });
    } else {
      // If adding new task
      navigation.navigate('Calendar', { taskName, date, hour });
    }
  };

  const goBack = () => {
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text style={styles.inputText}>{date}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          is24Hour={true}
        />
        <TouchableOpacity style={styles.timeInput} onPress={showTimePicker}>
          <Text style={styles.inputText}>{hour}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Task name"
          placeholderTextColor="#ccc"
          value={taskName}
          onChangeText={setTaskName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={goBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveTask}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#302f4b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    height: '60%',
    backgroundColor: '#141529',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 20,
  },
  // backButton: {
  //   position: 'absolute',
  //   top: 10,
  //   left: 10,
  //   zIndex: 1,
  // },
  dateInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#302f4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#302f4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#302f4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
  // buttonsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  // button: {
  //   backgroundColor: '#00FA9A',
  //   borderRadius: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   marginHorizontal: 5,
  // },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#00FA9A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: '#ff6347', // Red color for the back button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddScreen;
