import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Task } from '../models/tasks';

interface ToDoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: ToDoListProps) {
  const [taskList, setTasks] = useState<Task[]>(tasks);
  const today = new Date();

  useEffect(() => {
    const updatedTasks = tasks.map(task => {
      if (task.date < today && task.status !== 'completed') {
        return { ...task, status: 'completed' as 'completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(taskList.map(task =>
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
        data={taskList}
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
