import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    loading: false,
    users: [],
    errorMessage: "",
}

 export const getPosts = createAsyncThunk('posts/getPosts',async ()=>{
    let dataUrl = `https://jsonplaceholder.typicode.com/users`;
    let response = await axios.get(dataUrl);
    console.log(response.data)
    return response.data;
    
})

const UsersSlice = createSlice({
    name:'users',
    initialState:initialState,
    extraReducers: (builder) =>{
        builder.addCase(getPosts.pending,(state)=>{
            state.loading = true
        }).addCase(getPosts.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload
        }).addCase(getPosts.rejected,(state,action)=>{
            state.loading = false;
            state.errorMessage = "Data not getting....!"
        })
    }
});

export default UsersSlice.reducer;