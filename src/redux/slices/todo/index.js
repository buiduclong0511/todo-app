import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    list: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.list.push({
                id: uuidv4(),
                ...action.payload,
            });
        },
        updateContent: (state, action) => {
            const id = action.payload.id;
            const newContent = action.payload.newContent;
            state.list = state.list.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        content: newContent,
                    };
                }
                return todo;
            });
        },
        updateStatus: (state, action) => {
            const id = action.payload;
            state.list = state.list.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        done: !todo.done,
                    };
                }
                return todo;
            });
        },
        deleteTodo: (state, action) => {
            const id = action.payload;
            state.list = state.list.filter((todo) => todo.id !== id);
        },
    },
});

export default todoSlice.reducer;
export const { addTodo, updateContent, updateStatus, deleteTodo } = todoSlice.actions;
