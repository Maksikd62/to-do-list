import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Task } from '../models/tasks';

const initialTasks: Task[] = [
  { id: 1, title: 'Meet Lorence', date: new Date('2025-03-28T12:00:00'), priority: 'mid', status: 'in progress' }, 
  { id: 2, title: 'Call John', date: new Date('2025-03-28T18:30:00'), priority: 'low', status: 'in progress' },
  { id: 3, title: 'Submit report', date: new Date('2025-04-04T10:00:00'), priority: 'high', status: 'in progress' },
  { id: 4, title: 'Team meeting', date: new Date('2025-04-15T09:00:00'), priority: 'mid', status: 'in progress' },
  { id: 5, title: 'Doctor appointment', date: new Date('2025-05-01T11:00:00'), priority: 'low', status: 'in progress' },
];

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const today = new Date();

  useEffect(() => {
    const updatedTasks = tasks.map(task => {
      if (task.date < today && task.status !== 'completed') {
        return { ...task, status: 'completed' as 'completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'in progress' ? 'completed' : 'in progress' } : task
    ));
  };

  const formatDate = (date: Date) => {
    const taskDate = new Date(date);
    const isToday = taskDate.toLocaleDateString() === today.toLocaleDateString();

    if (isToday) {
      return taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return taskDate.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To do List</Text>
      <Text style={styles.date}>{today.toLocaleDateString()}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={() => toggleTask(item.id)}>
            <Text style={[styles.taskText, item.status === 'completed' && styles.completed]}>
              {item.status === 'completed' && <AntDesign name="checkcircle" size={16} color="green" />} {item.title}
            </Text>
            <Text style={styles.time}>{formatDate(item.date)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  time: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
