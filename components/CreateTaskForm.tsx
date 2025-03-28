import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { Task } from '../models/tasks';
import { addItem } from '../store/db';

export default function CreateTaskForm() {
  const { control, handleSubmit, setValue, watch, reset } = useForm<Omit<Task, 'id'>>({
    defaultValues: {
      title: '',
      date: new Date(),
      priority: 'low',
      status: 'in progress',
    },
  });

  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const selectedDate = watch('date');

  const onSubmit = (data: Omit<Task, 'id'>) => {
    console.log(data);
    addItem(data.title, data.date, data.priority, data.status);
    reset();  
    router.push('/list');
  };

  const onCancel = () => {
    reset(); 
    router.push('/list');
  };

  const handleDateChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) setValue('date', date);
  };
  
  const handleTimeChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    setShowTimePicker(false);
    if (date) {
      const currentDate = selectedDate;
      currentDate.setHours(date.getHours());
      currentDate.setMinutes(date.getMinutes());
      setValue('date', currentDate);
    }
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
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

      <Text style={styles.label}>Due Date:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Set Time:</Text>
      <TouchableOpacity style={styles.dateButton} onPress={handleShowTimePicker}>
        <Text style={styles.dateText}>{selectedDate.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
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
  dateButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
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
