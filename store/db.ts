import * as SQLite from 'expo-sqlite';
import { Task } from '../models/tasks';

const db = SQLite.openDatabaseSync('tasks.db');

async function init() {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            priority TEXT CHECK(priority IN ('low', 'mid', 'high')) NOT NULL,
            status TEXT CHECK(status IN ('in progress', 'completed')) NOT NULL
        );
        INSERT INTO tasks (title, date, priority, status) VALUES ('Task 1', '2025-03-28', 'low', 'in progress');
        INSERT INTO tasks (title, date, priority, status) VALUES ('Task 2', '2025-03-29', 'mid', 'in progress');
        INSERT INTO tasks (title, date, priority, status) VALUES ('Task 3', '2025-03-30', 'high', 'in progress');`);
}

async function addItem(title: string, date: Date, priority: 'low' | 'mid' | 'high', status: 'in progress' | 'completed') {
    await db.runAsync(`INSERT INTO tasks (title, date, priority, status) VALUES (?, ?, ?, ?);`, 
                      [title, date.toISOString(), priority, status]);
}

async function deleteItem(id: number) {
    await db.runAsync(`DELETE FROM tasks WHERE id = ?;`, [id]);
}

async function updateItem(id: number, title: string, date: Date, priority: 'low' | 'mid' | 'high', status: 'in progress' | 'completed') {
    await db.runAsync(`UPDATE tasks SET title = ?, date = ?, priority = ?, status = ? WHERE id = ?;`, 
                      [title, date.toISOString(), priority, status, id]);
}

async function getItems(): Promise<Task[]> {
    return await db.getAllAsync<Task>('SELECT * FROM tasks');
}

export { init, addItem, deleteItem, getItems, updateItem }
