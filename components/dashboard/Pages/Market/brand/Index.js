'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeBrandStatusMutation, useDeleteBrandMutation, useGetAllBrandQuery } from "@/lib/market/brandApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {   
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =  useGetAllBrandQuery({ page, perPage, search });
    const brands=query?.data;
    const [changeStatus, { data: dataStatus }] =   useChangeBrandStatusMutation();
    const [deleteBrand, {result:deleteResult}] =   useDeleteBrandMutation();

    const  columns =[
        {key:'persian_name', label:'نام فارسی'},
        {key:'original_name' ,label:'نام اصلی'},
        {key:'image' , label:'لوگو' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.persian_name} />}
      ]

    useEffect(() => {
        useToast({result:deleteResult , message:'برند'});
    }, [deleteResult]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:'برند'})
    }, [dataStatus])

    return (
        <CustomTable 
           title={'برند ها'}
           sitemap={'بخش فروش/ویترین/برند ها'}
           pagination={brands?.meta}
           deleteRecord={deleteBrand}
           data={query}
           columns={columns} />         
    )
}
export default Index;