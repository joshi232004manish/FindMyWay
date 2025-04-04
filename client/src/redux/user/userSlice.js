import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  curUser:null,
  error:null,
  loading:false

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    signInStart:(state)=>{
        state.loading = true;
    },
    signInSuccess:(state,action)=>{
        state.curUser = action.payload,
        state.loading = false,
        state.error = null;

    },
    signInFailure:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    },
    updateUserStart:(state)=>{
        state.loading = true;
    },
    updateUserSuccess:(state,action)=>{
        state.curUser = action.payload,
        state.loading = false,
        state.error = null;
    },
    updateUserFailure:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    },
    deleteUserStart:(state)=>{
        state.loading = true;
    },
    deleteUserSuccess:(state,action)=>{
        state.curUser = action.payload,
        state.loading = false,
        state.error = null;
    },
    deleteUserFailure:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    },
    signOutUserStart:(state)=>{
        state.loading = true;
    },
    signOutUserSuccess:(state,action)=>{
        state.curUser = action.payload,
        state.loading = false,
        state.error = null;
    },
    signOutUserFailure:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    },
    
},
})

// console.log(userSlice);

// Action creators are generated for each case reducer function
export const {signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess} = userSlice.actions;
export default userSlice.reducer;