'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteValueMutation, useGetAllValueQuery } from "@/lib/market/categoryValueApi";
import useToast from "@/hooks/useToast";

const Index = ({params}) => {
    const { page, perPage  } = useSelector((state) => state.util);
    
    const query =  useGetAllValueQuery({ page, perPage , params  });
    const values =query?.data;

    const [deleteValue, {result:deleteResult}] =  useDeleteValueMutation();
    
    const  columns =[
        {key:'value', label:'مقدار',render:(_,row)=>JSON.parse(row.value).value},
        {key:'product' , label:'نام محصول' , render:(_ , row)=>row.product.name }, 
        {key:'category_attribute' ,label:'نام فرم', render:(_ , row)=>row.category_attribute?.name} , 
        {key:'type' ,label:'تابپ' ,render:(_,row)=>row.type == 1 ? 'ساده ' : 'انتخابی' },
        {key:'value' ,label:'افزایش قیمت',render:(_,row)=>JSON.parse(row.value).price_increase},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={JSON.parse(row.value).value} />}
      ]

    useEffect(() => {
      useToast({result:deleteResult , message:"ویژگی"})
    }, [deleteResult]);

    return (
         <CustomTable 
            title={'ویژگی ها'}
            href={`/dashboard/market/attribute/value/create/${params}`}
            sitemap={'بخش فروش/ویترین/فرم کالاها/ویژگی ها'}
            pagination={values?.meta}
            deleteRecord={deleteValue}
            data={query}
            columns={columns} /> 
    )
}
export default Index;