'use client'
import { CustomTable, SettingRecord, StatusRecord  } from "@/components/dashboard/Table";
import { useChangeEmailStatusMutation, useDeleteEmailMutation, useGetAllEmailQuery } from "@/lib/notify/EmailApi";
 
const Index = () => {   
    const  columns =[
        {key:'subject', label:'موضوع'},
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord message={'ایمیل'} query={useChangeEmailStatusMutation} status={value} id={row.id} /> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'published_at' ,label:'تاریخ انتشار'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'ایمیل'} query={useDeleteEmailMutation} id={row.id} title={row.name} />}
      ]

    return (
        <CustomTable 
            title={' ایمیل ها'}
            sitemap={' بخش  اطلاع رسانی / ایمیل ها  '}
            query={useGetAllEmailQuery}
            columns={columns} />
                
    )
}
export default Index;