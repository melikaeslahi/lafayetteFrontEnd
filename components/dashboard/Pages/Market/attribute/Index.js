'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteAttributeMutation, useGetAllAttributeQuery } from "@/lib/market/categoryAttributeApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllAttributeQuery({ page, perPage, search });
    const attributes = query?.data;

    const [deleteAttribute, {result:deleteResult}] =  useDeleteAttributeMutation();

    const  columns =[
      {key:'name', label:'نام'},
      {key:'category' , label:'دسته بندی' , render:(_ , row)=>row.category.name}, 
      {key:'unit' ,label:'واحد'},
      {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
    ]

    useEffect(() => {
      useToast({result:deleteResult , message:'فرم کالا'})
    }, [deleteResult]);

    return (
      <CustomTable 
        title={'فرم کالا'}
        sitemap={'بخش فروش/ویترین/فرم کالا'}
        pagination={attributes?.meta}
        deleteRecord={deleteAttribute}
        data={query}
        columns={columns}
          /> 
           
    )
}
export default Index;