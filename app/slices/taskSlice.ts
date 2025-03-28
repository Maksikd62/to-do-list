import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../models/tasks';

interface TasksState {
    tasks: Task[];
    inProgressCount: number;
}

const initialState: TasksState = {
    tasks: [],
    inProgressCount: 0,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.inProgressCount = action.payload.filter(task => task.status === 'in progress').length;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            if (action.payload.status === 'in progress') {
                state.inProgressCount += 1;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
            if (taskIndex !== -1) {
                if (state.tasks[taskIndex].status === 'in progress') {
                    state.inProgressCount -= 1;
                }
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            }
        },
        markTaskCompleted: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task && task.status === 'in progress') {
                task.status = 'completed';
                state.inProgressCount -= 1;
            }
            if (task && task.status !== 'completed') {
                task.status = 'completed';
            }
        }
    }
});

export const { setTasks, addTask, deleteTask, markTaskCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;

