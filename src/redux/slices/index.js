import { combineReducers } from "@reduxjs/toolkit";

import todoReducer from "./todo";

export * from "./todo";

const rootReducer = combineReducers({
    todo: todoReducer,
});

export default rootReducer;
