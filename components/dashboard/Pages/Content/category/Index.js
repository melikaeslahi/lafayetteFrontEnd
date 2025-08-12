'use client'
import { CustomTable , ShowImage , StatusRecord , SettingRecord } from "@/components/dashboard/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChangePostCategoryStatusMutation, useDeletePostCategoryMutation, useGetAllPostCategoryQuery } from "@/lib/content/postCategoryApi";
import useToast from "@/hooks/useToast";
 
const Index = () => { 
    const { page, perPage, search } = useSelector((state) => state.util);
    const query = useGetAllPostCategoryQuery({ page, perPage, search });

    const [changeStatus, { data: dataStatus }] = useChangePostCategoryStatusMutation();
    const [deleteCategory, result] = useDeletePostCategoryMutation();

    const  columns =[
      {key:'name', label:'نام دسته'},
      {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
      {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
      {key:'description' ,label:'توضیحات' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
      {key:'tags' ,label:'برچسب ها'},
      {key:'parent' ,label:'دسته والد', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
      {key:'slug',label:'اسلاگ'},
      {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
    ]

    useEffect(()=>{
         useToast({ dataStatus:dataStatus ,  message:"دسته بندی"})
    },[dataStatus]);

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
       useToast({result:result , message:"دسته بندی"})
    }, [result]);

    return (<>
            <CustomTable 
               title={'دسته بندی'}
               sitemap=' بخش محتوایی / دسته بندی ها'
               pagination={query?.meta}
               deleteRecord={deleteCategory}
               columns={columns}
               data={query} />
    </>
    )
}
export default Index;