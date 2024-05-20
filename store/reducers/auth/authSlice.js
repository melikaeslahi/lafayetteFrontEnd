 
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
   loading:false,
   user:null,
   error:[],
   data:null
}

const AuthSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
       
       setUser:(state , action)=>{
           state.user=action.payload
       },

       setLoading:(state , action)=>{
        state.loading=action.payload
       },

       setError:(state , action)=>{
        state.error=action.payload
       },
       
       setData:(state , action)=>{
        state.data=action.payload
         

       },
       
    

        },
 
 

    }
);

export const AuthReducer =  AuthSlice.reducer;
export const {
    setUser,
    setLoading,
    setError,
    setData
     } = AuthSlice.actions;

