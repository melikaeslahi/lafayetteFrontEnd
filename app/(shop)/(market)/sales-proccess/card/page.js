'use client';
import PaymentContent from "@/components/shop/pages/payment/PaymentContent";
import Tabs from "@/components/shop/tab/TabContainer";
import { faStoreAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { convertEnglishToPersian, priceFormatter } from "@/helper/helper";
import { useGetCartQuery } from "@/lib/customer/salesProccess/cartApi";
import { useEffect, useState } from "react";
import { setSidbarDatabaseInfo } from "@/store/reducers/customer/cartSlice";
import CartItemFromDatabase from "@/components/shop/pages/salesProccess/cartItem/CartItemFromDatabase";
import CartItemFromCash from "@/components/shop/pages/salesProccess/cartItem/CartItemFromCash";
import Sidebar from "@/components/shop/pages/salesProccess/cartItem/Sidbar";

const { default: PaymentContainer } = require("@/components/shop/pages/payment/PaymentContainer")

const Card = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const { data: cartItems ,isSuccess } =  useGetCartQuery();

 
       
    return (<>
        <PaymentContainer sidebar={
            <Sidebar>
            <section className={`flex justify-between items-center mb-1 pb-3 w-full`}>
                <button 
                type="submit" 
                className={`bg-red-600 text-white rounded-lg  my-2  px-6 py-2  w-full`}> 
                 تکمیل فرایند خرید 
            </button>

            </section>
            </Sidebar>
        }>

            <PaymentContent title={'سبد خرید'} >

                {user ? <CartItemFromDatabase /> : <CartItemFromCash />}
            </PaymentContent>


        </PaymentContainer>

        <Tabs />
    </>)
}
export default Card;