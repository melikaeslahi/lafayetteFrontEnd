'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Editor, Input, InputTags } from '@/components/dashboard/inputs'
import { useAddNewProductCategoryMutation, useGetAllParentIdQuery } from '@/services/market/productCategoryApi'
import CreateCategorySchema from '@/validation/doshboard/market/category/createCategory'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { Table, TableContainer, TableError404, TableLoading, TableNotFound } from '@/components/dashboard/Table'
import { useGetDetailOrderQuery } from '@/services/market/orderApi'
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { useDispatch, useSelector } from 'react-redux'




const Detail = ({ params }) => {
    const { openDrawer,    } =  useSelector((state) => state.util);

    const { data: details = [], isError, isLoading, isSuccess } = useGetDetailOrderQuery(params);
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(details.data?.length));

    }, [isLoading, isSuccess, isError, details])





    return (
        <>
            <TitlePage
                name="   جرئیات سفارش  "
                sitemapPage='بخش فروش /ویترین /    سفارشات  /  جزئیات سفارش'
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>
            <section className={`absolute top-40  left-0 w-screen md:w-screen dark:bg-zinc-700 bg-white  ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${openDrawer ? 'xl:w-screen' : 'xl:w-4/5'} flex flex-col justify-center items-center my-5 rounded`}>





                <section className="w-4/5 relative overflow-x-auto  rounded p-3 m-3 shadow-lg ">

                    <section>
{isLoading ? <TableLoading /> : isSuccess ?     <Table>
                            <thead className="text-pallete  shadow-md">
                                <tr className={`text-center`}>
                                    <th>#</th>
                                    <th className="pl-3 py-3">  نام محصول </th>
                                    <th className="pl-3 py-3">  درصد فروش فوق العاده     </th>
                                    <th className="pl-3 py-3">   مبلغ فروش فوق العاده  </th>
                                    <th className="pl-3 py-3">     تعداد  </th>
                                    <th className="pl-3 py-3">  جمع قیمت محصول  </th>
                                    <th className="pl-3 py-3">  مبلغ نهایی   </th>
                                    <th className="pl-3 py-3">    رنگ  </th>
                                    <th className="pl-3 py-3">  ویژگی   </th>


                                </tr>
                            </thead>
                            <tbody>

                            {     details.data?.map((order, index) => (

                                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                        <td className="pl-3 py-3">{index += 1}</td>
                                        <td> {order.singleProduct.name ? order.singleProduct.name : ' - '} </td>
                                        <td> {order.amazingSale?.percentage ? order?.amazingSale.percentage : ' - '} تومان</td>
                                        <td> {order.amazing_sale_discount_amount ?? ' - '} تومان</td>
                                        <td> {order.number ? order.number : ' - '}  </td>
                                        <td> {order.final_product_price ? order.final_product_price : ' - '}</td>
                                        <td> {order.number * order.final_product_price ? order.number * order.final_product_price : ' - '}تومان </td>
                                        <td> {order.color.color_name ?? ' - '}  </td>

                                        <td>
                                            {order.orderItemsAttributes.map((attribute , index) =>(
                                                 attribute.categoryAttribute.name + ':' + JSON.parse(attribute.categoryAttributeValue.value).value 
                                            ))}
                                        </td>
                                    </tr>

                                )) }





                            </tbody>
                        </Table> : isError ? <TableError404 /> : <TableNotFound /> }
                    
                    </section>
                </section>
            </section >

        </>
    )
}
export default Detail;