'use client'
import { CustomTable, SettingRecord, StatusRecord} from "@/components/dashboard/Table";
import { useChangeFaqStatusMutation, useDeleteFaqMutation, useGetAllFaqsQuery } from "@/lib/content/faqApi";
 

const Index = () => {
    const  columns =[
        {key:'question', label:'سوال' ,render:(_,row)=>row.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)},
        {key:'answer' , label:'پاسخ' , render:(_,row)=>row.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)}, 
        {key:'status' ,label:'وضعیت', render:(_,row)=><StatusRecord message={'سوال'} query={useChangeFaqStatusMutation} status={row.status} id={row.id} /> } , 
        {key:'tags' ,label:'برچسب ها'},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'سوال'} query={useDeleteFaqMutation} id={row.id} title={row.name} />}
      ]
    
    return (
          <CustomTable
             title={'سوالات متداول'}
             sitemap={' بخش محتوایی / سوالات متداول'}
             query={useGetAllFaqsQuery}
             columns={columns}/>
    ) 
}
export default Index;