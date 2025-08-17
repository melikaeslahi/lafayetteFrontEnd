'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeCustomerActivationMutation, useDeleteCustomerMutation, useGetAllCustomerQuery } from "@/lib/user/customerApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);
 
    const  query =  useGetAllCustomerQuery({ page, perPage, search });
    const customers = query?.data;
    const [changeActivation, { data: dataActivation }] =   useChangeCustomerActivationMutation();
 
    const [deleteCustomer, result] =  useDeleteCustomerMutation();
    
    const  columns =[
        {key:'first_name', label:' نام ونام خانوادگی ' ,render:(value , row)=>`${value} ${row.last_name}`},
        {key:'email' ,label:'ایمیل'} ,
        {key:'mobile' ,label:'موبایل'} ,          
        {key:'activation' ,label:'وضعیت فعالیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeActivation}/> } ,  
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <SettingRecord id={row.id} title={row.name} />}
      ]

    useEffect(() => {
         useToast({result:result , message:'مشتری'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataActivation , message:'مشتری'})
    }, [dataActivation])


    return (
    <CustomTable 
       title={'مشترین'}
       sitemap={'بخش  کاربران / مشتریان '}
       pagination={customers?.meta}
       deleteRecord={deleteCustomer}
       data={query}
       columns={columns} /> 
            
    )
}
export default Index;