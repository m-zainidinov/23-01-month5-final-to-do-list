import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskList: JSON.parse(localStorage.getItem('tasks')) || [],
    editingTaskIndex: null,
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = action.payload;
            state.taskList = [...state.taskList, newTask];
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
        },
        saveTask: (state, action) => {
            const { index, newText } = action.payload;
            const updatedTaskList = state.taskList.map((task, i) => {
                if (i === index) {
                    return { ...task, text: newText };
                }
                return task;
            })
            state.taskList = updatedTaskList;
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter((task, index) => index !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
        },
        toggleImportant: (state, action) => {
            state.taskList[action.payload].important = !state.taskList[action.payload].important;
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
        },
    }
});

export const { addTask, saveTask, deleteTask, toggleImportant } = taskSlice.actions;

export default taskSlice.reducer;