'use client'
import { CustomTable, SettingRecord, StatusRecord} from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeFaqStatusMutation, useDeleteFaqMutation, useGetAllFaqsQuery } from "@/lib/content/faqApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);
 
    const  query = useGetAllFaqsQuery({ page, perPage, search });
    const faqs = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangeFaqStatusMutation();
    const [deleteFaq, {result:deleteResult}] =  useDeleteFaqMutation();

    const  columns =[
        {key:'question', label:'سوال' ,render:(_,row)=>row.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)},
        {key:'answer' , label:'پاسخ' , render:(_,row)=>row.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)}, 
        {key:'status' ,label:'وضعیت', render:(_,row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
      ]
    
    useEffect(() => {
      useToast({result:deleteResult , message: 'سوال'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:'سوال'})
    }, [dataStatus])

    return (
          <CustomTable
             title={'سوالات متداول'}
             sitemap={' بخش محتوایی / سوالات متداول'}
             pagination={faqs?.meta}
             deleteRecord={deleteFaq}
             data={query}
             columns={columns}/>
    ) 
}
export default Index;