import items from "@/constant/dashbord/items";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
     filtering: {},
     products:null,
     sort:{key:null , value:null},
     filterValue:null,
     openMobileFilter:false,
     openMobileSort:false,
   


     
}

const ProductsSlice = createSlice({
    name: 'productCustomer',
    initialState: initialState,
    reducers: {
       
        setFiltering: (state, action) => {
            state.filtering = action.payload;

        },
     
         setProducts: (state, action) => {
            state.products = action.payload;

        },
        setSortValue:(state, action)=>{
            state.sort = action.payload;

        },
        setFilterValues:(state , action)=>{
            state.filterValue = action.payload;
       
        },

         setOpenMobileFilter:(state , action)=>{
            state.openMobileFilter = action.payload;
       
        },
        setOpenMobileSort:(state , action)=>{
            state.openMobileSort = action.payload;
       
        },
        setCloseMobileSortAndFilter:(state , action)=>{
            state.openMobileSort = action.payload;
            state.openMobileFilter = action.payload;

       
        },
     
    }
});

export const ProductsCustomerReducer = ProductsSlice.reducer;
export const {
    
    setFiltering,
    setProducts,
    setSortValue,
    setFilterValues,
    setOpenMobileFilter,
    setOpenMobileSort ,
    setCloseMobileSortAndFilter,
     } = ProductsSlice.actions;