import items from "@/constant/dashbord/items";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    isThLarge:true,
    isThList:false,
    search:false,
    isSidebarOpen:false,
    openDrawer: false,
     
 
  
}

const UtilStoreSlice = createSlice({
    name: 'utilStore',
    initialState: initialState,
    reducers: {
        setIsThLarge:(state , action)=>{
            if (action.payload === true) {
                state.isThList = false
            }
           state.isThLarge = action.payload;
           console.log( 'payload' , action.payload);
           console.log( 'large' , state.isThLarge);
           console.log( 'list' , state.isThList);
        },
        setIsThList:(state , action)=>{
            if (action.payload === true) {
                state.isThLarge = false
            }
            state.isThList = action.payload;
         },     
        setSearch: (state, action) => {
            state.search = action.payload;
        },

        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        
       
   

    }
});

export const UtilStoreReducer = UtilStoreSlice.reducer;
export const {
    isThLarge,
    isThList,
    setSearch,
    setSidebarOpen,
    
  
    setItemLength } = UtilStoreSlice.actions;