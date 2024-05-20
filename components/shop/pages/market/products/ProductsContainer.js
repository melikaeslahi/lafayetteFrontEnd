'use client'
import { Button } from "@/components/dashboard/inputs";
import { setIsThLarge, setIsThList } from "@/store/reducers/dashboard/UtilSlice";
import { faArrowLeft, faArrowRight, faServer, faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import Filtering from "./Filtering";
import { setProducts } from "@/store/reducers/customer/ProductsSlice";
import { useSetFilteringMutation } from "@/lib/customer/homeApi";
import { Field, Form, Formik } from "formik";
import SelectedFiltering from "@/components/shop/pages/market/products/SelectedFiltering";
import Sorting from "@/components/shop/pages/market/products/Sorting";
import MobileFiltering from "./MobileFiltering";
import MobileSorting from "./MobileSorting";
const ProductsContainer = ({ title, children }) => {
    const dispatch = useDispatch();
    const { isThLarge, isThList } = useSelector(state => state.util);
    const { openMobileFilter , openMobileSort } = useSelector(state => state.productsCustomer);

     
 
    
    
  
 
 

    return (
        <>
          
            <section className="relative w-full mx-auto xl:container">

                <section className="flex flex-col justify-center h-auto  lg:flex-row xl:flex-row md:flex-col py-5 my-5  ">

               

                    <section className={` ${isMobile ? 'sticky top-0 z-50 bg-white  shadow-lg shadow-gray-300 p-2  w-full h-12 border border-gray-300' : 'sticky top-3 right-0 flex flex-col justify-start items-start p-3  mt-2 w-full h-3/4 lg:w-1/5 xl:w-1/5  md:w-full border border-gray-300  shadow-lg shadow-gray-200 rounded-lg'} `}>
                       {isMobile && openMobileFilter ?  null : <Filtering /> } 
                    </section>

                    <section className="flex flex-col p-3 xl:mr-2 lg:mr-2 mt-2 w-full xl:w-4/5 lg:w-4/5 md:w-full border border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                        <section className="w-full p-2 m-3 flex border-b border-pallete">
                            <section className="p-2 m-3 flex   w-3/4 ">
                                <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                                <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                                <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                            </section>

                            <section className="p-2 m-3 flex justify-end  w-1/4">
                                <Button onClick={() => dispatch(setIsThLarge(!isThLarge))}>
                                    <FontAwesomeIcon icon={faThLarge} className={'text-pallete text-xl font-extrabold p-2'} />
                                </Button>
                                <Button onClick={() => dispatch(setIsThList(!isThList))}>
                                    <FontAwesomeIcon icon={faThList} className={'text-pallete text-xl font-extrabold p-2'} />
                                </Button>
                            </section>
                        </section>
                        <section>
                       {isMobile && openMobileSort ? <MobileSorting /> : <Sorting /> } 

                            
                            <SelectedFiltering />
                            {children}
                            <section className="flex justify-center items-center m-5">
                                <Button className={'py-1 px-4 bg-pallete text-white rounded-lg'}>بارگذاری موارد بیشتر</Button>
                            </section>
                        </section>

                    </section>
                 
                </section>
              

            </section>
            {isMobile && openMobileSort ? <MobileSorting />  :null } 
                {isMobile && openMobileFilter ?   <MobileFiltering /> : null } 
             
        </>
    )
}
export default ProductsContainer;