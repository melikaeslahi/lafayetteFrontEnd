'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useChangePostCommentableMutation, useChangePostStatusMutation, useDeletePostMutation, useGetAllPostQuery } from "@/services/content/postApi";
 

const Index = () => {
   
    const  columns =[
        {key:'title', label:'عنوان پست'},
        {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'پست'} query={useChangePostStatusMutation}  status={row.status} id={row.id}/> } , 
        {key:'body' ,label:'متن' ,render:(_,row)=>row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'tags' ,label:'برچسب ها'},
        {key:'category' ,label:'دسته بندی', render:(_,row)=>row.category !== null ? row.category?.name : 'دسته اصلی'},
        {key:'slug',label:'اسلاگ'},
        {key:'commentable',label:'امکان درج کامنت', render:(_,row)=><StatusRecord message={'کامنت پست'} query={useChangePostCommentableMutation} name="commentable" status={row.status} id={row.id}/> },
        {key:'summary',label:'خلاصه' ,render:(_,row)=>row.summary.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'پست'} query={useDeletePostMutation} id={row.id} title={row.title} />}
      ]

    return (
      <CustomTable 
        title={'پست ها'}
        sitemap={'بخش محتوایی /پست ها'}
        query={useGetAllPostQuery}
        columns={columns} />        
    )
}
export default Index;