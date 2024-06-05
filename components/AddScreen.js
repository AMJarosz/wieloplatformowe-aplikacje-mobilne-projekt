import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  const handleSave = () => {
    if (date && hour && taskName) {
      navigation.navigate('Calendar', { taskName, date, hour });
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#ccc"
          value={date}
          onFocus={showDatePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Hour"
          placeholderTextColor="#ccc"
          value={hour}
          onFocus={showTimePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Task name"
          placeholderTextColor="#ccc"
          value={taskName}
          onChangeText={setTaskName}
        />
        <Button
          title="Save"
          onPress={handleSave}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
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
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#302f4b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
});

export default AddScreen;
