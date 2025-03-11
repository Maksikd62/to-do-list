import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Task } from '../models/tasks';

const initialTasks: Task[] = [
  { id: 1, title: 'Meet Lorence', date: new Date('2018-03-04T12:00:00'), priority: 'mid', status: 'in progress' },
  { id: 2, title: 'Meet Lorence', date: new Date('2018-03-04T13:00:00'), priority: 'low', status: 'in progress' },
  { id: 3, title: 'Meet Lorence', date: new Date('2018-03-04T15:00:00'), priority: 'high', status: 'in progress' },
  { id: 4, title: 'Meet Lorence', date: new Date('2018-03-04T16:00:00'), priority: 'mid', status: 'in progress' },
  { id: 5, title: 'Meet Lorence', date: new Date('2018-03-04T17:00:00'), priority: 'low', status: 'in progress' },
];

interface ToDoListProps {
  setShowCreateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToDoList({ setShowCreateTaskForm }: ToDoListProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === 'in progress' ? 'completed' : 'in progress' } : task
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To do List</Text>
      <Text style={styles.date}>4th March 2025</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={() => toggleTask(item.id)}>
            <Text style={[styles.taskText, item.status === 'completed' && styles.completed]}>
              {item.status === 'completed' && <AntDesign name="checkcircle" size={16} color="green" />}
              {item.title}
            </Text>
            <Text style={styles.time}>{item.date.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowCreateTaskForm(true)}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
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
