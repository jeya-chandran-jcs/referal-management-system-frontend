import { createSlice } from "@reduxjs/toolkit";

const initialState={
    candidates:[],
    loading:false,
}

const candidateSlice=createSlice({
    name:"candidate",
    initialState,
    reducers:{
        setCandidates:(state,action)=>{
            state.candidates=action.payload;
            state.loading=false;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
    }
})

export const {setCandidates,setLoading}=candidateSlice.actions;
export default candidateSlice.reducer;