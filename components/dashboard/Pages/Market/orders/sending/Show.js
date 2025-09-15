'use client'
import Button from '@/components/dashboard/inputs/Button'
import { usePathname, useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Editor, Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
import { useGetAllParentIdQuery, useGetProductCategoryQuery, useUpdateProductCategoryMutation } from '@/services/market/productCategoryApi'
import EditCategorySchema from '@/validation/doshboard/market/category/editCategory'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { Table, TableContainer, TableLoading } from '@/components/dashboard/Table'
import { useShowQuery } from '@/services/market/orderApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPrint } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const ShowOrder = ({ params }) => {
    const { openDrawer,    } =  useSelector((state) => state.util);
    const pathname = usePathname();
    const { data: orders = {}, isLoading, isSuccess, isError } = useShowQuery(params);


    const router = useRouter();









    // useEffect(() => {
    //     setErrorData(data);
    //     if (errorData) {
    //         if (errorData !== null && errorData.status === 200) {
    //             router.back();
    //         } else if (errorData.success === false) {
    //             toast.error(' خطایی پیش آمده است ', {
    //                 position: toast.POSITION.TOP_LEFT,
    //                 rtl: true
    //             })
    //         }
    //     }
    // }, [data, errorData]);

    return (
        <>
            <TitlePage
                name="   فاکتور  "
                sitemapPage=' بخش فروش /ویترین /   سفارشات   /   فاکتور  '            >
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

                        {isSuccess ? <Table>
                            <thead className="text-pallete  shadow-md">
                                <tr className={`text-center`}>

                                    <th className="pl-3 py-3">#</th>
                                    <th className="pl-3 py-3"> <FontAwesomeIcon icon={faCogs} /> تنظیمات </th>
                                </tr>
                            </thead>
                            
                                <tbody>
                                    <tr class="table-primary">

                                        <th>{orders.data.id}</th>
                                        <td  className="pl-3 py-3">
                                            <Link href="" id="print"  className={'text-pallete bg-white  rounded-sm border border-pallete px-3 py-1 m-2'}>
                                                <FontAwesomeIcon  icon={faPrint}/>
                                                
                                                چاپ
                                            </Link>
                                            <Link href={`/dashboard/market/orders/sending/detail/${params}`}  className={'text-white bg-pallete rounded-sm px-3 py-1 m-2'} >
                                                <i class="fa fa-book"></i>
                                                جزئیات
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> نام مشتری </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.user.first_name + orders.data.user.last_name ?? '-'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th> آدرس </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.address ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> نام شهر </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.city?.name ?? '-'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th> پلاک </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.no ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> واحد </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.unit ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> نام تحویل گیرنده </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.recipient_first_name + ' ' + orders.data.address.recipient_last_name ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> موبایل </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.mobile ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> کد پستی </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.address.postal_code ?? '-'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>    نوع پرداخت </th>
                                        <td className="pl-3 py-3"> {orders.data.paymentStatusValue} </td>
                                    </tr>
                                    <tr>
                                        <th>   وضعیت پرداخت </th>
                                        <td className="pl-3 py-3">{orders.data.paymentTypeValue}</td>
                                    </tr>
                                    <tr>
                                        <th>   مبلغ ارسال </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.delivery_amount ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>    وضعیت ارسال </th>
                                        <td className="pl-3 py-3"> {orders.data.deliveryStatusValue}</td>
                                    </tr>

                                    <tr>
                                        <th>    تاریخ ارسال </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.delivery_date ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th> (بدون تخفیف) مجموع مبلغ سفارش    </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_final_amount ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>  مجموع تمامی مبلغ تخفیف  </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_discount_amount ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>    مبلغ نهایی </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_final_amount - orders.data.order_discount_amount ?? '-'} تومان
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>         مبلغ تخفیف همه محصولات </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_total_products_discount_amount ?? '-'} تومان
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>              بانک   </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.payment.payments?.gateway ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>          کوپن استفاده شده</th>
                                        <td className="pl-3 py-3">
                                            {orders.data.copan.code ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>تخفیف کد تخفیف</th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_copan_discount_amount ?? '-'} تومان
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>   تخفیف عمومی استفاده شده  </th>
                                        <td className="pl-3 py-3">
                                            {orders.data.commonDiscount.title ?? '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>     مبلغ تخفیف عمومی</th>
                                        <td className="pl-3 py-3">
                                            {orders.data.order_common_discount_amount ?? '-'} تومان
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>          وضعیت سفارش</th>
                                        <td className="pl-3 py-3"> {orders.data.orderStatusValue}</td>
                                    </tr>


                                </tbody>
                                


                            {/* {shows.data?.map((show, index) => { */}

                            {/* return (
                    ) */}
                            {/* })} */}



                        </Table> : <TableLoading />
                            }
                    </section>
                </section>
            </section >


        </>
    )
}
export default ShowOrder;
