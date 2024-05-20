'use client';
import { faBagShopping, faBars,faSun, faMoon, faSearch, faUser  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import logo from '../../public/image/Untitled.jpg';
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "./ProfileDropDown";
import { modalOpenClose, setIsCartItemModal, setIsSearch ,setSidebarOpen  } from "@/store/reducers/dashboard/UtilSlice";
import CartItemModal from "./pages/salesProccess/cartItem/CartItemModal";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { addToCart, getTotal, setSidbarDatabaseInfo  } from "@/store/reducers/customer/cartSlice";
import { convertEnglishToPersian } from "@/helper/helper";
import { useGetCartQuery } from "@/lib/customer/salesProccess/cartApi";
import SearchModal from "./modals/SearchModal";
import { useGetMenusQuery } from "@/lib/customer/homeApi";
import Menus from "./header/navbar/Menus";
import Sidebar from "./header/sidbar/Sidbar";
 
 
const Header = () => {
    const dispatch = useDispatch();
    const { theme, setTheme } = useTheme();
    const {user} = useSelector(state =>state.auth);
    const {isSidebarOpen} =  useSelector(state => state.util);

    const { commentModal} = useSelector(state =>state.productCustomer);

    const {isOpenModal , isSearch ,isCartItemModal} =useSelector((state)=>state.util );
    const cart = useSelector(state => state.cart);
    // const { data: cartItems ,isSuccess } =  useGetCartQuery();

     


     useEffect(() => {
        dispatch( getTotal());
    }, [cart, dispatch]);

    useEffect(()=>{
        if(isOpenModal === false)
        dispatch(setIsSearch(false));
    } , [isOpenModal])

    const { data: cartItems ,isSuccess } =  useGetCartQuery();
    const [sideBarInfo, setSideBarInfo] =  useState({ totalCartQty:  0, totalCartDiscountAmaount:  0, totalCartProductPrice:0 });
    useEffect(() => {
        dispatch(  setSidbarDatabaseInfo(sideBarInfo))
        }, [sideBarInfo])
    

 
            useEffect(()=>{
    let cartTotal =  cartItems?.cartItems?.reduce((cartTotal , cartItem)=>{
        if(cartItem){
        const {number ,cartItemFinalDiscount ,cartItemFinalPrice ,cartItemProductPrice} =cartItem;
        
        const totalCartQty = number;
        const totalFinalDiscount = cartItemFinalDiscount;
        const totalProductPrice = number * cartItemProductPrice;

        const totalfinalProductPrice =cartItemFinalPrice;
        
        cartTotal.cartQty += totalCartQty;
        cartTotal.discount +=totalFinalDiscount;
        cartTotal.totalFinal += totalfinalProductPrice;
        cartTotal.totalProductPrice += totalProductPrice;

     
        return cartTotal;
        }else{
            return cartTotal;
        }
        
        

        
    } , {totalFinal:0 ,totalProductPrice:0 , cartQty:0 , discount:0})

 
     setSideBarInfo({totalCartQty:cartTotal?.cartQty ?? 0 , totalCartDiscountAmaount:cartTotal?.discount ?? 0 , totalCartFinalPrice: cartTotal?.totalFinal,totalCartProductPrice:cartTotal?.totalProductPrice ?? 0 })
 } , [ cartItems])

  
    
    return (
        <>
            <header className="w-full ">

                <section className="flex flex-col bg-white dark:bg-zinc-800 w-full py-3 z-20 h-auto  justify-between items-center     shadow-lg">
                   {isCartItemModal? <CartItemModal /> : null }
                   { isSearch  ?    <SearchModal /> : null}
                  
                    <section className="flex justify-between items-center w-full">
                       <section className="flex justify-start items-center px-4">
                        <section className="">
                           { user ? 
                              <ProfileDropDown />    : 
                               <Link  className="text-lotus  hover:text-pallete" href={'/login&register'}   >
                              ورود به حساب کاربری
                              </Link> }
                        </section>
                       </section>
                       <section className="flex justify-center">
                       <Link  className="text-lotus  cursor-pointer hover:text-pallete" href={'/'}   >
                          <Image className="" alt="logo" src={logo} width='200' height={'80'} /></Link> 
                       </section>
                       <section className="flex justify-end pl-3">
                       <section className="p-4 relative">
                         

                            <FontAwesomeIcon 
                            className="text-lg hover:text-pallete hover:cursor-pointer" 
                            onClick={()=>dispatch( setIsCartItemModal(true))} icon={faBagShopping} />
                            <sup className="absolute left-2 top-3 align-super" >

                            <span className="bg-red-600 text-white text-xs font-medium p-0.5 w-1  rounded dark:bg-clifford dark:text-pallete border border-pallete">
                                 { user ?convertEnglishToPersian(cart.sideBarDatabaseInfo?.totalCartQty)  :convertEnglishToPersian(cart.cartTotalQty)} 
                                 {/* { convertEnglishToPersian(cart.cartTotalQty)} */}
                                 
                                 </span>
                        </sup>
                        
                        </section>
                        <section className="p-4">
                            <FontAwesomeIcon className="text-lg hover:text-pallete hover:cursor-pointer"
                             onClick={()=>{dispatch(setIsSearch(true))}} icon={faSearch} />                                                                              
                        </section>
                        <section className="p-4">
                         {theme ?
                         <FontAwesomeIcon
                         icon={theme === "light" ? faMoon  :faSun }
                         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                         className='text-lg hover:text-pallete hover:cursor-pointer dark:text-white' />  
                         : null}
                            
                        
                        </section>
                       </section>
                    </section>
                    <section className=" h-16 flex justify-center   items-center border-black border-t-2">
                        {/* navbar */}
                    <Menus  />
                  
                    </section> 
                    </section>
            </header>

            {/* <header className="w-full visible xl:invisible lg:invisible md:visible">
                <section className="flex      flex-col  bg-white w-full p-3    h-12  justify-between items-center z-50  fixed top-0 shadow-lg">
                    <section className="flex  flex-col justify-between items-center w-full fixed top-0  ">

                        <section className="flex justify-between items-center w-full m-3">
                            
                            <FontAwesomeIcon className="text-lg p-1" icon={faBars}  onClick={()=>dispatch(setSidebarOpen(!isSidebarOpen))} />
                          
                            <Image className="" src={logo} width='200' height={'80'} />
                        </section>
        
                    </section>

                   {isSidebarOpen ? <Sidebar /> : null} 
                </section>

            </header> */}
        </>
    )
}
export default Header;