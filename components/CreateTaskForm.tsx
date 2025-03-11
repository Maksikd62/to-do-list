import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import { Task } from '../models/tasks';

interface CreateTaskFormProps {
  setShowCreateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateTaskForm({ setShowCreateTaskForm }: CreateTaskFormProps) {
  const { control, handleSubmit } = useForm<Omit<Task, 'id'>>({
    defaultValues: {
      title: '',
      date: new Date(),
      priority: 'low',
      status: 'in progress',
    },
  });

  const onSubmit = (data: Omit<Task, 'id'>) => {
    console.log(data);
    setShowCreateTaskForm(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>

      <Text style={styles.label}>Task Title:</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Enter task title" />
        )}
      />

      <Text style={styles.label}>Set Priority:</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Mid" value="mid" />
            <Picker.Item label="High" value="high" />
          </Picker>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowCreateTaskForm(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});