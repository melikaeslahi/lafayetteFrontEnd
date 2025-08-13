'use client'
import { CustomTable, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useChangeApprovedPostMutation, useChangeCommentPostStatusMutation, useGetAllCommentPostQuery } from "@/lib/content/commentPostApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =  useGetAllCommentPostQuery({ page, perPage, search });
    const comments = query?.data;
    const [changeStatus, { data: dataStatus }] =   useChangeCommentPostStatusMutation();
    const [changeApproved, { data: dataApproved }] =    useChangeApprovedPostMutation();
    const handlerApproved = async (id) => {
        await changeApproved(id);
    }
    const  columns =[
        {key:'body', label:'نظر' ,render:(_ , row)=>row.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)},
        {key:'parent_id' , label:'پاسخ به' , render:(_ , row)=> row.parent_id ?? `${row.parent_id.user.first_name} ${row.parent_id.user.last_name}`}, 
        {key:'user' ,label:'کد کاربر', render:(_ , row)=>row.user.id} , 
        {key:'user' ,label:'نویسنده نظر' ,render:(_,row)=>`${row.user.first_name} ${row.user.last_name}` },
        {key:'commentable' ,label:'کد پست',render:(_,row)=>row.commentable.id},
        {key:'commentable' ,label:'پست', render:(_ , row)=>row.commentable.title },
        {key:'approved',label:'وضعیت کامنت',render:(_,row)=>row.approved == 1 ? 'تایید شده': 'تایید نشده'},   
        {key:'status',label:'وضعیت' , render:()=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><> 
        <Link href={`${pathname}/show/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  نمایش     </Link>
        <Button type="button" onClick={() => {
          handlerApproved(row.id)
          }} className={`py-2 px-4 rounded text-white
          ${row.approved == 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}> 
          {row.approved == 1 ? "عدم تایید":"تایید"}   
        </Button>  
        </>}
      ]

   useEffect(()=>{
    useToast({dataStatus:dataStatus , message:"کامنت"})
   },[dataStatus])

    useEffect(() => {
        let message;
        if (dataApproved) {
            if (dataApproved.status === true && dataApproved.checked === true) {
               message = 'کامنت با موفقیت تایید شد';
            } else  {
                message='کامنت با موفقیت عدم تایید شد'
            }
        }
        useToast({dataStatus:dataApproved, customMessage:message});
    }, [dataApproved])

    return (   
            <CustomTable 
             title={'کامنت ها'}
             sitemap={'بخش فروش/ویترین/کامنت ها'}
             pagination={comments?.meta}
             data={query}
             columns={columns}
            />  
    )
}
export default Index;