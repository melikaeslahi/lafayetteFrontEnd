'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useChangeSliderStatusMutation, useDeleteSliderMutation, useGetAllSliderQuery } from "@/lib/content/sliderApi";
 
const Index = () => {    
    const  columns =[
      {key:'name', label:'نام اسلایدر'},
      {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'اسلایدر'} query={useChangeSliderStatusMutation} status={row.status} id={row.id} /> } , 
      {key:'parent' ,label:'دسته والد', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
      {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'اسلایدر'} query={useDeleteSliderMutation} id={row.id} title={row.name} />}
    ]

    return (
        <CustomTable 
          title={'اسلایدر'}
          sitemap={'بخش محتوایی /اسلایدرها'}
          query={useGetAllSliderQuery}
          columns={columns} />
    )
}
export default Index;