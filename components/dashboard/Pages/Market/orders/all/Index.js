'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";

import Link from "next/link";
import { useCancelOrderMutation  , useChangeOrderStatusMutation, useChangeSendStatusMutation, useGetAllOrderQuery } from "@/lib/market/orderApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [setting, setSetting] =  useState(false);
    const [settingId, setSettingId] = useState('');
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: orders = [], isError, isLoading, isSuccess } = useGetAllOrderQuery({ page, perPage, search });

    const [chengeSendStatus, { data: dataSendStatus }] =   useChangeSendStatusMutation();
    const [changeOrderStatus, { data: dataOrderStatus }] =  useChangeOrderStatusMutation();
    const [cancelOrder, { data: dataCancelOrder }] = useCancelOrderMutation();




    const handlerSetting = (productId) => {
        setSetting(!setting);
        setSettingId(productId)
    }

    const handlerSendStatus = async (id) => {
        await chengeSendStatus(id);
    }

    const handlerOrderStatus = async (id) => {
        await changeOrderStatus(id);
    }

    const handlerCancelOrder = async (id) => {
        await cancelOrder(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(orders.data?.length));

    }, [isLoading, isSuccess, isError, orders])



    useEffect(() => {
        // status checked and unchecked
        if (dataSendStatus) {

            if (dataSendStatus.status === 200) {
                toast.success('         وضعیت  ارسال با موفقیت تغییر کرد       ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataSendStatus.status === 404) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataSendStatus])

    useEffect(() => {
        // status checked and unchecked
        if (dataOrderStatus) {

            if (dataOrderStatus.status === 200) {
                toast.success(' وضعیت سفارش با موفقیت تغییر کرد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataOrderStatus.status === 404) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataOrderStatus])

    useEffect(() => {
        // status checked and unchecked
        if (dataCancelOrder) {

            if (dataCancelOrder.status === 200) {
                toast.success('    شفارش با موفقیت باطل شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataCancelOrder.status === 404) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataCancelOrder])

    return (<>
        <TitlePage
            name='  سفارشات'
            sitemapPage='بخش فروش/ویترین/ سفارشات'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد دسته جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={orders?.meta}

        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3">#</th>
                        <th className="pl-3 py-3">کد سفارش</th>
                        <th className="pl-3 py-3"> (بدون تخفیف) مجموع مبلغ سفارش </th>
                        <th className="pl-3 py-3">  مجموع تمامی مبلغ تخفیف </th>
                        <th className="pl-3 py-3">مبلغ تخفیف همه محصولات</th>
                        <th className="pl-3 py-3"> مبلغ نهایی</th>
                        <th className="pl-3 py-3"> وضعیت پرداخت </th>
                        <th className="pl-3 py-3"> شیوه ی پرداخت </th>
                        <th className="pl-3 py-3"> بانک </th>
                        <th className="pl-3 py-3"> وضعیت ارسال </th>
                        <th className="pl-3 py-3"> شیوه ی ارسال </th>
                        <th className="pl-3 py-3"> وضعیت سفارش </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.data?.map(( order, index) => {
                      
                        return (
                            <tr key={index} className=" text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                    <td className="pl-3 py-3">{index += 1}</td>
                                    <td className="pl-3 py-3"> { order.id } </td>
                                    <td className="pl-3 py-3"> { order.order_final_amount } تومان</td>
                                    <td className="pl-3 py-3"> { order.order_discount_amount } تومان</td>
                                    <td className="pl-3 py-3"> { order.order_total_products_discount_amount } تومان</td>
                                    <td className="pl-3 py-3"> { order.order_final_amount  -  order.order_discount_amount }تومان </td>
                                    <td className="pl-3 py-3"> { order.paymentStatusValue } </td>
                                    <td className="pl-3 py-3">{ order.paymentTypeValue }</td>
                                    <td className="pl-3 py-3"> { order.payment.payments?.gateway ?  order.payment.payments?.gateway :'-' } </td>
                                    <td className="pl-3 py-3"> { order.deliveryStatusValue }</td>
                                    <td className="pl-3 py-3"> { order.delivery.name }</td>
                                    <td className="pl-3 py-3"> { order.orderStatusValue }</td>
                                
                                <td>
                                    <button onClick={() => handlerSetting(order.id)} className="py-2 px-4   rounded ">  <FontAwesomeIcon icon={faEllipsisV} />     </button>


                                </td>
                                <section className={`${setting && settingId == order.id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
                                    <Link href={`${pathname}/show/${order.id}`} className="py-2 px-4   rounded text-right">     مشاهده فاکتور     </Link>
                             


                                    <Button type="button" onClick={() => {
                                        handlerOrderStatus(order.id)
                                    }} className="py-2 px-4 rounded text-right">     تغییر وضعیت سفارش   </Button>
                                    <Button type="button" onClick={() => {
                                         handlerSendStatus(order.id)
                                    }} className="py-2 px-4 rounded text-right">     تغییر وضعیت ارسال   </Button>
                                    <Button type="button" onClick={() => {
                                         handlerCancelOrder(order.id)
                                    }} className="py-2 px-4 rounded text-right">           باطل کردن   </Button>
                                </section>
                            </tr>)
                    })}
                </tbody>
            </Table>}
        </TableContainer>
    </>
    )
}
export default Index;