'use client'
import { SettingRecord, CustomTable } from "@/components/dashboard/Table";
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from "@/services/market/deliveryApi";
 
const Index = () => {
    const  columns =[
        {key:'name', label:'نام روش'},
        {key:'amount' , label:'هزینه' }, 
        {key:'delivery_time' ,label:'زمان ارسال' } , 
        {key:'delivery_time_unit' ,label:'واحد زمان ارسال' },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'روش ارسال'} query={useDeleteDeliveryMutation} id={row.id} title={row.name} />}
      ]

    return (      
       <CustomTable 
          title={'روش های ارسال'}
          sitemap={'بخش فروش/ویترین/ روش های ارسال'}
          query={useGetAllDeliveryQuery}
          columns={columns} />   
    )
}
export default Index;