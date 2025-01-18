import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../redux/candidateSlice";

export const store=configureStore({
    reducer:{
        candidate:candidateReducer,
    }
})