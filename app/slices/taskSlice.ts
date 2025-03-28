import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../models/tasks'

interface TasksState {
    tasks: Task[] // Масив задач
}

const initialState: TasksState = {
    tasks: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.tasks[index] = action.payload
            }
        },
    },
})

export const { setTasks, addTask, deleteTask, updateTask } = tasksSlice.actions

export default tasksSlice.reducer
