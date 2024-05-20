import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
    order: null,
    paymentType: null,
    cashReceiver:''
}


export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setPaymentType: (state, action) => {
            state.paymentType = action.payload;
        },
        setCashReceiver: (state, action) => {
            state.cashReceiver = action.payload;
        },
    },

})
export const PaymentReducer = paymentSlice.reducer;


export const { setOrder, setPaymentType ,setCashReceiver } = paymentSlice.actions;