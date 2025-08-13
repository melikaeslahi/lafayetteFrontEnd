'use client'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useChangePostCommentableMutation, useChangePostStatusMutation, useDeletePostMutation, useGetAllPostQuery } from "@/lib/content/postApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const query = useGetAllPostQuery({ page, perPage, search });
    const posts = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangePostStatusMutation();
    const [changeCommentable, { data: dataCommentable }] =  useChangePostCommentableMutation();
    const [deletePost, {result:deleteResult}] =  useDeletePostMutation();
    
    const  columns =[
        {key:'title', label:'عنوان پست'},
        {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'body' ,label:'متن' ,render:(_,row)=>row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'tags' ,label:'برچسب ها'},
        {key:'category' ,label:'دسته بندی', render:(_,row)=>row.category !== null ? row.category?.name : 'دسته اصلی'},
        {key:'slug',label:'اسلاگ'},
        {key:'commentable',label:'امکان درج کامنت', render:(_,row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeCommentable}/> },
        {key:'summary',label:'خلاصه' ,render:(_,row)=>row.summary.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.title} />}
      ]

    useEffect(() => {
         useToast({result:deleteResult , message:'پست'})
    }, [deleteResult]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'پست'})
    }, [dataStatus])

    useEffect(() => {
         useToast({dataStatus:dataCommentable , message:'کامنت پست'})
    }, [dataCommentable])


    return (
      <CustomTable 
        title={'پست ها'}
        sitemap={'بخش محتوایی /پست ها'}
        pagination={posts?.meta}  
        deleteRecord={deletePost}
        data={query}
        columns={columns} />        
    )
}
export default Index;