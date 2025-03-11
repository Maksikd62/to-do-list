import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Platform } from 'react-native';
import ToDoList from './components/ToDoList';
import CreateTaskForm from './components/CreateTaskForm';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
      {!showCreateTaskForm ? (
        <ToDoList setShowCreateTaskForm={setShowCreateTaskForm} />
      ) : (
        <CreateTaskForm setShowCreateTaskForm={setShowCreateTaskForm} />
      )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safe: {
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
