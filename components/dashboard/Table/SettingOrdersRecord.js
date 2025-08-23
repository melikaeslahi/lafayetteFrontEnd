import useToast from "@/hooks/useToast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../inputs";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useChangeSendStatusMutation,useChangeOrderStatusMutation ,useCancelOrderMutation } from "@/lib/market/orderApi";

const SettinOrdersRecord=({id , })=>{
    const pathname = usePathname();
    const [setting, setSetting] =   useState(false);
    const [settingId, setSettingId] = useState('');
  
    const [chengeSendStatus, { data: dataSendStatus }] =    useChangeSendStatusMutation();
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
            message= ' وضعیت  ارسال با موفقیت تغییر کرد '
        }else{
          message ='خطایی پیش آمده است '
        }
        useToast({dataStatus:dataSendStatus , customMessage:message})
    }, [dataSendStatus])

     useEffect(() => {
        let message;
        if (dataOrderStatus?.status === 200) {
            message= ' وضعیت  سفارش با موفقیت تغییر کرد '
        }else{
          message ='خطایی پیش آمده است '
        }
         useToast({dataStatus:dataOrderStatus , message :'سفارش'});
    }, [dataOrderStatus])

    useEffect(() => {
        let message;
        if (dataCancelOrder?.status === 200) {
            message= 'سفارش با موفقیت باطل شد  '
        }else{
          message ='خطایی پیش آمده است '
        }
        useToast({dataStatus:dataCancelOrder , message :'سفارش'});
    }, [dataCancelOrder])
    return(<>
     <button onClick={() => handlerSetting(row.id)} className="py-2 px-4 rounded">  <FontAwesomeIcon icon={faEllipsisV} /> </button>

<section className={`${setting && settingId == id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
   <Link href={`${pathname}/show/${row.id}`} className="py-2 px-4 rounded text-right">     مشاهده فاکتور     </Link>
   <Button type="button" onClick={() => {
       handlerOrderStatus(id)
   }} className="py-2 px-4 rounded text-right">  تغییر وضعیت سفارش</Button>
   <Button type="button" onClick={() => {
         handlerSendStatus(id)
    }} className="py-2 px-4 rounded text-right">  تغییر وضعیت ارسال </Button>
   <Button type="button" onClick={() => {
          handlerCancelOrder(id)
   }} className="py-2 px-4 rounded text-right">   باطل کردن  </Button>
   </section>
    </>);
}
export default SettinOrdersRecord;