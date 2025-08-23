'use client'
import { CustomTable, SettingCommentRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeApprovedPostMutation, useChangeCommentPostStatusMutation, useGetAllCommentPostQuery } from "@/lib/content/commentPostApi";
 
 
const Index = () => {
    const  columns =[
        {key:'body', label:'نظر' ,render:(_ , row)=>row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)},
        {key:'parent_id' , label:'پاسخ به' , render:(_ , row)=> row.parent_id ?? `${row.parent_id.user.first_name} ${row.parent_id.user.last_name}`}, 
        {key:'user' ,label:'کد کاربر', render:(_ , row)=>row.user.id} , 
        {key:'user' ,label:'نویسنده نظر' ,render:(_,row)=>`${row.user.first_name} ${row.user.last_name}` },
        {key:'commentable' ,label:'کد پست',render:(_,row)=>row.commentable.id},
        {key:'commentable' ,label:'پست', render:(_ , row)=>row.commentable.title },
        {key:'approved',label:'وضعیت کامنت',render:(_,row)=>row.approved == 1 ? 'تایید شده': 'تایید نشده'},   
        {key:'status',label:'وضعیت' , render:()=><StatusRecord message={'کامنت'} query={useChangeCommentPostStatusMutation} status={row.status} id={row.id} changeStatus={changeStatus}/> },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingCommentRecord id={row.id} query={useChangeApprovedPostMutation} message={['کامنت با موفقیت تایید شد' ,'کامنت با موفقیت عدم تایید شد']} /> }
      ]


    return (   
            <CustomTable 
             title={'کامنت ها'}
             sitemap={'بخش فروش/ویترین/کامنت ها'}       
             query={useGetAllCommentPostQuery}
             columns={columns}
            />  
    )
}
export default Index;