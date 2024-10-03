import {createSlice} from "@reduxjs/toolkit"


const initialState={
    user:localStorage.getItem("SHEildUser") ? JSON.parse(localStorage.getItem("SHEildUser")):null,
    loading:false,
};

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,actions){
            state.loading = actions.payload
        },
    }
})

export  const {setUser,setLoading} = profileSlice.actions;
export default profileSlice.reducer;
