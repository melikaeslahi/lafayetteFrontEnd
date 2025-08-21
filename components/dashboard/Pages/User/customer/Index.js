'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeCustomerActivationMutation, useDeleteCustomerMutation, useGetAllCustomerQuery } from "@/lib/user/customerApi";
 
const Index = () => {
   
    const  columns =[
        {key:'first_name', label:' نام ونام خانوادگی ' ,render:(value , row)=>`${value} ${row.last_name}`},
        {key:'email' ,label:'ایمیل'} ,
        {key:'mobile' ,label:'موبایل'} ,          
        {key:'activation' ,label:'وضعیت فعالیت', render:(_ , row)=><StatusRecord name={'activation'} query={useChangeCustomerActivationMutation} message={'مشتری'} status={row.status} id={row.id}/> } ,  
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <SettingRecord message={'مشتری'} query={useDeleteCustomerMutation} id={row.id} title={row.name} />}
      ]

    return (
    <CustomTable 
       title={'مشترین'}
       sitemap={'بخش  کاربران / مشتریان '}
       query={useGetAllCustomerQuery}
       columns={columns} /> 
            
    )
}
export default Index;