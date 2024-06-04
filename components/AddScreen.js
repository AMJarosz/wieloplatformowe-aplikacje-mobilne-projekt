import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const AddScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');

  return (
    <View style={styles.background}>
      <View style={styles.container}>
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
          value={taskName}
          onChangeText={setTaskName}
        />
        <Button
          title="Save"
          onPress={() => navigation.navigate('Calendar', { taskName })}
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
  },
});

export default AddScreen;
