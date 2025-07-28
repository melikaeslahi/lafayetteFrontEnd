'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import {  faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useCancelOrderMutation  , useChangeOrderStatusMutation, useChangeSendStatusMutation,   useGetSendingOrderQuery } from "@/lib/market/orderApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [setting, setSetting] =  useState(false);
    const [settingId, setSettingId] = useState('');
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetSendingOrderQuery({ page, perPage, search });
    const orders = query?.data;

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
        let message;
        if (dataSendStatus?.status === 200) {
            message= 'وضعیت  ارسال با موفقیت تغییر کرد '
        } else {
            message=' خطایی پیش آمده است '
        }
      useToast({dataStatus:dataSendStatus, customMessage:message})
    }, [dataSendStatus])

    useEffect(() => {
        let message;
        if (dataOrderStatus?.status === 200) {
            message= 'وضعیت  سفارش با موفقیت تغییر کرد '
        } else {
            message=' خطایی پیش آمده است '
        }
      useToast({dataStatus:dataOrderStatus, customMessage:message})
      
    }, [dataOrderStatus])

    useEffect(() => {
        let message;
        if (dataCancelOrder?.status === 200) {
            message= '  سفارش با موفقیت باطل شد '
        } else {
            message=' خطایی پیش آمده است '
        }
      useToast({dataStatus:dataCancelOrder, customMessage:message})
    }, [dataCancelOrder])

    return (<>
    <TableHeader 
    title={'سفارشات'}
    href={`${pathname}/create`}
    sitemap={'بخش فروش/ویترین/ سفارشات'}
    />
        <TableContainer
            pagination={orders?.meta}
            query={query}
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
                    {orders.data?.map(( order) => {
                      
                        return (
                            <tr key={order.id} className=" text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                    <td className="pl-3 py-3">{order.id}</td>
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