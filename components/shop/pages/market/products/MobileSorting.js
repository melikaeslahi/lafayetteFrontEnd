import { setOpenMobileSort } from "@/store/reducers/customer/ProductsSlice";
import MobileContainer from "./MobileContainer"
import Link from "next/link";
import { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import { setProducts, setSortValue } from "@/store/reducers/customer/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSetFilteringMutation } from "@/services/customer/homeApi";
import {   faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MobileSorting =()=>{
    const { sort, filterValue } = useSelector(state => state.productsCustomer);

    const dispatch = useDispatch();

    const [getProducts, { data }] =  useSetFilteringMutation();
    useEffect(() => {

        dispatch(setSortValue(null));

    }, [])


    useEffect(() => {
        if (data) {
            dispatch(setProducts(data));
        }
    }, [data])

    useEffect(() => {
        if (sort) {
            async function sorting() {
                const formData = new FormData();
                formData.append('_method', 'GET');

                if (filterValue?.search)
                    formData.append('search', filterValue.search);

                if (sort?.key)
                    formData.append('sort', sort.key);

                if (filterValue?.brands)
                    formData.append('brands', filterValue.brands);

                if (filterValue?.min_price)
                    formData.append('min_price', filterValue.min_price);

                if (filterValue?.max_price)
                    formData.append('max_price', filterValue.max_price);

                await getProducts({ formData, category: filterValue?.categories })
                dispatch(setOpenMobileSort(false));
            }
            sorting();
        }
    }, [sort, filterValue])
    return(

        <>
        <MobileContainer title={'مرتب سازی'} handlerClose={()=>setOpenMobileSort()}>

           <section className="w-full h-full">
           
           <section className="flex flex-col justify-start items-center flex-grow">

<section className="flex justify-start items-center mr-2 ">
    <FontAwesomeIcon className="p-2  text-pallete" icon={faSortAmountAsc} />
    <p className="  mr-1 text-pallete font-bold">  مرتب سازی:</p>
</section>
<section className="flex m-2 ">
    <Link
        href={`#`}
        className={`${sort?.key === 1 ? 'text-white text-sm bg-pallete px-6 py-2 rounded-lg' : ''}`}
        onClick={() => dispatch(setSortValue({ key: 1, value: 'جدید ترین ها' }))} > جدید ترین ها
    </Link>

</section>
<section className="flex m-2 ">
    <Link
        href={`#`}
        className={`${sort?.key === 5 ? 'text-white text-sm bg-pallete px-6 py-2 rounded-lg' : ''}`}
        onClick={() => dispatch(setSortValue({ key: 5, value: 'پرفروش ترین ها' }))} >
        پرفروش ترین ها
    </Link>
</section>
<section className="flex m-2 ">
    <Link
        href={`#`}
        className={`${sort?.key === 4 ? 'text-white text-sm bg-pallete px-6 py-2 rounded-lg' : ''}`}
        onClick={() => dispatch(setSortValue({ key: 4, value: 'پر بازدید ترین ها' }))} >
        پر بازدید ترین ها
    </Link>
</section>
<section className="flex m-2 ">
    <Link
        href={`#`}
        className={`${sort?.key === 3 ? 'text-white text-sm bg-pallete px-6 py-2 rounded-lg' : ''}`}
        onClick={() => dispatch(setSortValue({ key: 3, value: 'قیمت از کم به زیاد' }))}>
        قیمت از کم به زیاد
    </Link>
</section>
<section className="flex m-2 ">
    <Link
        href={`#`}
        className={`${sort?.key === 2 ? 'text-white text-sm bg-pallete px-6 py-2 rounded-lg' : ''}`}
        onClick={() => dispatch(setSortValue({ key: 2, value: 'قیمت از زیاد به کم' }))}>
         قیمت از   زیاد به کم
    </Link>
</section>
</section>
           </section>
        </MobileContainer>
        </>
    )
}
export default MobileSorting;