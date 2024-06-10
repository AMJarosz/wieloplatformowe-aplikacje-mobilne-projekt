import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const fileUri = `${FileSystem.documentDirectory}tasks.json`;

export default function CalendarScreen({ route, navigation }) {
  const dateNow = new Date();
  const currentDate = dateNow.toISOString().split('T')[0];
  const [selectedDate, setSelected] = useState(currentDate);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo && fileInfo.exists) {
        const data = await FileSystem.readAsStringAsync(fileUri);
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

  const groupTasksByDay = (tasks) => {
    const groupedTasks = {};
    tasks.forEach(task => {
      const dayName = new Date(task.date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!groupedTasks[dayName]) {
        groupedTasks[dayName] = [];
      }
      groupedTasks[dayName].push(task);
    });
    return groupedTasks;
  };

  const filteredTasks = tasks
    .filter(task => {
      const taskDate = new Date(task.date);
      const selected = new Date(selectedDate);
      const endDate = new Date(selected);
      endDate.setDate(selected.getDate() + 7);
      return taskDate >= selected && taskDate <= endDate;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.hour}`);
      const dateB = new Date(`${b.date}T${b.hour}`);
      return dateA - dateB;
    });

  const groupedTasks = groupTasksByDay(filteredTasks);

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <Calendar
          testID="calendar"
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
          }}
          markingType={'custom'}
          markedDates={getMarkedDates()}
        />
      </View>
      <ScrollView style={styles.tasksContainer} contentContainerStyle={styles.tasksContentContainer}>
        {Object.keys(groupedTasks).length > 0 ? (
          Object.keys(groupedTasks).map(dayName => (
            <View key={dayName} style={styles.dayContainer}>
              <Text style={styles.dayHeaderText}>{dayName}</Text>
              {groupedTasks[dayName].slice(0, 5).map(task => (
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
          ))
        ) : (
          <View style={styles.noTasksContainer}>
            <Text style={styles.headerText}>No upcoming tasks from {selectedDate}</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add', { selectedDate: selectedDate })}>
        <Feather name="plus" size={24} color="#fff"  testID="add-button"/>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141529',
  },
  calendarWrapper: {
    flex: 1,
    backgroundColor: '#141529',
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
    flex: 1,
    marginTop: '40%',
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: '#141529',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tasksContentContainer: {
    paddingBottom: 80,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
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
    backgroundColor: '#00BFFF',
    borderRadius: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: '#141529',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: '#141529',
  },
  noTasksContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
