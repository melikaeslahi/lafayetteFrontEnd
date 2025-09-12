import { useAddToCartMutation } from "@/lib/customer/salesProccess/cartApi";
import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";



const initialState = {
    menuItems:null,
    // menuItems: localStorage.getItem('menuItems') ? JSON.parse(localStorage.getItem("menuItems")) || '{}' : [],
    isOpenItem: {},
}

// console.log(initialState)



export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setMenuItemOpen: (state, action) => {



            //محصولی که کلیک شده روش برای اضافه شدن آیا ایندکس اش در کارت آیتم وجود دارد با خیر 
            const existingIndex = state.menuItems.findIndex(item => item.id === action.payload.id && item.name === action.payload.name);
            if (existingIndex >= 0) {
                state.menuItems[existingIndex] = {
                    ...state.menuItems[existingIndex],
                    menuItemOpen: !state.menuItems[existingIndex].menuItemOpen,

                }


            } else {
                let tempMenuItem = {
                    ...action.payload,
                    menuItemOpen: true

                }
                state.menuItems.push(tempMenuItem)



            }

            localStorage.setItem("menuItems", JSON.stringify(state.menuItems));
            // sidebarSlice.caseReducers.getMenuItemOpen();

        },
        getMenuItemOpen: (state) => {
            //two way for convert array of object into objects :
            //1
            // var object = menuItems.reduce(
            //   (obj, item) => Object.assign(obj, { [item.id]: item }), {});
            //2 : that is 99% faster
            if (state?.menuItems) {
                let data = state.menuItems?.reduce((obj, item) => (obj[item.id] = item, obj), {});
                state.isOpenItem = data;
            }
        }

    },


})
export const SidebarReducer = sidebarSlice.reducer;


export const { setMenuItemOpen, getMenuItemOpen } = sidebarSlice.actions;