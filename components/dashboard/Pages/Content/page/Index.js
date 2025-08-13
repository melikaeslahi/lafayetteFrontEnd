'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangePageStatusMutation, useDeletePageMutation, useGetAllPageQuery } from "@/lib/content/pageApi";
import useToast from "@/hooks/useToast";

const Index = () => {
   
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllPageQuery({ page, perPage, search });
    const pages = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangePageStatusMutation();
    const [deletePage, {result:deleteResult}] =  useDeletePageMutation();
    
    const  columns =[
        {key:'title', label:'عنوان صفحه'},
        {key:'body' , label:'بدنه صفحه' , render:(_ , row)=> row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.title} />}
      ]

    useEffect(() => {
        useToast({result:deleteResult , message:'پیج ساز'})
    }, [deleteResult]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:"پیج ساز"})
    }, [dataStatus])

    return(  
        <CustomTable
          title={'پیج ساز'}
          sitemap={'بخش محتوایی /پیج ساز'}
          pagination={ pages?.meta}
          deleteRecord={deletePage}
          data={query}
          columns={columns} />                  
    )
}
export default Index;