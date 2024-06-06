import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const fileUri = `${FileSystem.documentDirectory}tasks.json`;

export default function CalendarScreen({ route, navigation }) {
  const dateNow = new Date();
  const currentDate = dateNow.toISOString().split('T')[0];
  const [selectedDate, setSelected] = useState(currentDate);
  const [tasks, setTasks] = useState([]);

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
  };

  const loadTasks = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      console.log('File URI:', fileUri);  // Log the file URI for debugging
      if (fileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(fileUri);
        console.log('File contents:', data);  // Log the file contents for debugging
        setTasks(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (route.params?.taskName && route.params?.date && route.params?.hour) {
      const newTask = {
        id: Math.random().toString(36).substring(7),
        name: route.params.taskName,
        date: route.params.date,
        hour: route.params.hour,
        done: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    } else if (route.params?.editedTask) {
      const { id, name, date, hour } = route.params.editedTask;
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, name, date, hour } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  }, [route.params]);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (task) => {
    navigation.navigate('Add', { task });
  };

  const toggleDone = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const getMarkedDates = () => {
    let markedDates = {};
    tasks.forEach(task => {
      const date = task.date;
      if (!markedDates[date]) {
        markedDates[date] = {
          marked: true,
          dotColor: '#06ca88',
          customStyles: {
            container: {
              backgroundColor: '#06ca88',
            },
            text: {
              color: 'white',
            },
          },
        };
      }
    });
    return markedDates;
  };

  const filteredTasks = tasks
  .filter(task => task.date === selectedDate)
  .sort((a, b) => {
    const timeA = parseInt(a.hour.replace(':', ''));
    const timeB = parseInt(b.hour.replace(':', ''));
    return timeA - timeB;
  });

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
            console.log('selected day', day.dateString);
          }}
          markingType={'custom'}
          markedDates={getMarkedDates()}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add', { selectedDate: selectedDate })}>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      {filteredTasks.length > 0 ? (
  <View style={styles.tasksContainer}>
    <Text style={styles.headerText}>Tasks for today</Text>
    {filteredTasks.map(task => (
      <TouchableOpacity
        key={task.id}
        style={[
          styles.taskContainer,
          { backgroundColor: task.done ? '#06ca88' : '#141529' }
        ]}
        onPress={() => toggleDone(task.id)}
      >
        <Text style={[styles.taskText, { color: task.done ? '#141529' : '#fff' }]}>
          {`${task.hour}    ${task.name}`}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => editTask(task)}>
            <Feather name="edit" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
            <Feather name="trash-2" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>
) : (
  <View style={styles.tasksContainer}>
    <Text style={styles.headerText}>No tasks for today</Text>
  </View>
)}
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
  tasksContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#141529',
    borderRadius: 10,
    padding: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
  editButton: {
    backgroundColor: '#00BFFF', // Blue color
    borderRadius: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: '#141529'
  },  
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: '#141529'
  },
});
