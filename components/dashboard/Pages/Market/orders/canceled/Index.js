'use client'
import { CustomTable } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useCancelOrderMutation  , useChangeOrderStatusMutation, useChangeSendStatusMutation,   useGetCanceledOrderQuery } from "@/lib/market/orderApi";
import useToast from "@/hooks/useToast";
 

const Index = () => {
    const pathname = usePathname();
    const [setting, setSetting] =  useState(false);
    const [settingId, setSettingId] = useState('');
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetCanceledOrderQuery({ page, perPage, search });
    const orders= query?.data;

    const [chengeSendStatus, { data: dataSendStatus }] =   useChangeSendStatusMutation();
    const [changeOrderStatus, { data: dataOrderStatus }] =  useChangeOrderStatusMutation();
    const [cancelOrder, { data: dataCancelOrder }] = useCancelOrderMutation();

    const  columns =[
        {key:'id', label:'کد سفارش'},
        {key:'order_final_amount' , label:'(بدون تخفیف) مجموع مبلغ سفارش' , render:(value)=> `${value} نومان` }, 
        {key:'order_discount_amount' ,label:'مجموع تمامی مبلغ تخفیف', render:(value)=> `${value} نومان`} , 
        {key:'order_total_products_discount_amount' ,label:'مبلغ تخفیف همه محصولات' ,render:(value)=> `${value} نومان`},
        {key:'order_final_amount' ,label:'مبلغ نهایی' ,render:(_,row)=>`${ row.order_final_amount  -  row.order_discount_amount }تومان` },
        {key:'paymentStatusValue' ,label:'وضعیت پرداخت '},
        {key:'paymentTypeValue',label:'شیوه ی پرداخت '},
        {key:'payment',label:'بانک ' , render:()=>row.payment.payments?.gateway ?  row.payment.payments?.gateway :'-'},
        {key:'deliveryStatusValue',label:'وضعیت ارسال '},
        {key:'delivery',label:'شیوه ی ارسال ' , render:(value)=>value.name},
        {key:'orderStatusValue',label:'وضعیت سفارش ' },
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <>
         <button onClick={() => handlerSetting(row.id)} className="py-2 px-4 rounded">  <FontAwesomeIcon icon={faEllipsisV} /> </button>

         <section className={`${setting && settingId == row.id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
            <Link href={`${pathname}/show/${row.id}`} className="py-2 px-4 rounded text-right">     مشاهده فاکتور     </Link>
            <Button type="button" onClick={() => {
                handlerOrderStatus(row.id)
            }} className="py-2 px-4 rounded text-right">  تغییر وضعیت سفارش</Button>
            <Button type="button" onClick={() => {
                  handlerSendStatus(row.id)
             }} className="py-2 px-4 rounded text-right">  تغییر وضعیت ارسال </Button>
            <Button type="button" onClick={() => {
                   handlerCancelOrder(row.id)
            }} className="py-2 px-4 rounded text-right">   باطل کردن  </Button>
            </section>
        </>}
      ]

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
            message= ' وضعیت  ارسال با موفقیت تغییر کرد '
        }else{
            message='   خطایی پیش آمده است  '
        }
        useToast({dataStatus:dataSendStatus, customMessage:message});
    }, [dataSendStatus])

    useEffect(() => {
        let message;
        if (dataOrderStatus?.status === 200) {
            message= ' وضعیت  سفارش با موفقیت تغییر کرد '
        }else{
            message='   خطایی پیش آمده است  '
        }
        useToast({dataStatus:dataOrderStatus, customMessage:message});
    }, [dataOrderStatus])

    useEffect(() => {
        let message;
        if (dataCancelOrder?.status === 200) {
            message= 'شفارش با موفقیت باطل شد '
        }else{
            message=' خطایی پیش آمده است  '
        }
        useToast({dataStatus:dataCancelOrder, customMessage:message});
    }, [dataCancelOrder])

    return ( 
        <CustomTable 
            title={"سفارشات"}
            sitemap={'بخش فروش/ویترین/ سفارشات'}
            pagination={orders?.meta}
            data={query}
            columns={columns} />     
    )
}
export default Index;