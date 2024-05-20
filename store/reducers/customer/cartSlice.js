import { useAddToCartMutation } from "@/lib/customer/salesProccess/cartApi";
import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";



const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) || '{}' : [],

    //قیمت کل محصولات
    cartTotalAmount: 0,
    //تعداد کل محصولات
    cartTotalQty: 0,

    discountTotalAmount: 0,
    sideBarDatabaseInfo: {}

}
 



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:   (state, action) => {
           

         
            //محصولی که کلیک شده روش برای اضافه شدن آیا ایندکس اش در کارت آیتم وجود دارد با خیر 
            const existingIndex = state.cartItems.findIndex(item => item.product.id === action.payload.product.id && item.selected_color.id === action.payload.selected_color.id);
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQty: state.cartItems[existingIndex].cartQty + 1,
                    finalPrice: state.cartItems[existingIndex].finalPrice
                }
                toast('محضول افزایش یافت', { position: 'bottom-right' });
            } else {
                let tempProductItem = {
                    ...action.payload,
                    cartQty: action.payload.cartQty

                }
                state.cartItems.push(tempProductItem)

                toast('محصول به سبد خرید ضافه شد', { position: 'bottom-right' });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotal(state) {
            let cartTotal = state.cartItems?.reduce((cartTotal, cartItem) => {
                const { product, cartQty, selected_color } = cartItem;

                const productPrice = parseInt(product.price) + parseInt(selected_color?.price_increase ? selected_color?.price_increase : 0);
                const discount = product?.amazingSales ? product.price * (product?.amazingSales?.percentage / 100) : parseInt(0);

                const finalPrice = cartQty * (productPrice)
                const itemTotal = finalPrice;
                const qtyTotal = cartQty
                const disCountTotal = cartQty * discount;
                cartTotal.total += itemTotal;
                cartTotal.qty += qtyTotal;
                cartTotal.discount += disCountTotal;

                return cartTotal;
            }
                ,
                {
                    total: 0,
                    qty: 0,
                    discount: 0
                }
            )
            // cartTotal?.total = parseFloat(cartTotal?.total.toFixed());
            state.cartTotalAmount = cartTotal?.total ?? 0;
            state.cartTotalQty = cartTotal?.qty ?? 0;
            state.discountTotalAmount = cartTotal?.discount ?? 0;

        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQty > 1) {
                state.cartItems[itemIndex].cartQty -= 1;

                toast.info("تعداد کاهش یافت", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQty === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                toast.error("محصول از سبد خرید حذف شد", {
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = nextCartItems;

                    toast.error("محصول از سبد خرید حذف شد", {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems)
                );
                return state;
            });
        },
     


        // database cart
      
        setSidbarDatabaseInfo: (state, action) => {
            state.sideBarDatabaseInfo = action.payload;
        }
    },

})
export const CartReducer = cartSlice.reducer;


export const { addToCart, getTotal,removeFromCart , decreaseCart, setSidbarDatabaseInfo } = cartSlice.actions;