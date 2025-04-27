import {createSlice} from "@reduxjs/toolkit"


const initialState={
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
    loading:false,
    notifications: [],
    complaints: [],
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
        setNotifications(state,value){
            state.notifications = value.payload;
        },
        setComplaints(state,value){
            state.complaints = value.payload;
        }
    }
})

export  const {setUser,setLoading, setNotifications, setComplaints} = profileSlice.actions;
export default profileSlice.reducer;
