'use client'
import { SettingRecord, CustomTable } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from "@/lib/market/deliveryApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllDeliveryQuery({ page, perPage, search });
    const deliveries =query?.data;
    const [deleteDelivery, {result:deleteResult}] =  useDeleteDeliveryMutation();

    const  columns =[
        {key:'name', label:'نام روش'},
        {key:'amount' , label:'هزینه' }, 
        {key:'delivery_time' ,label:'زمان ارسال' } , 
        {key:'delivery_time_unit' ,label:'واحد زمان ارسال' },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]
     
    useEffect(() => {
        useToast({result:deleteResult , message:'روش ارسال'})
    }, [deleteResult]);

    return (      
       <CustomTable 
          title={'روش های ارسال'}
          sitemap={'بخش فروش/ویترین/ روش های ارسال'}
          pagination={deliveries?.meta}
          deleteRecord={deleteDelivery}
          data={query}
          columns={columns} />   
    )
}
export default Index;