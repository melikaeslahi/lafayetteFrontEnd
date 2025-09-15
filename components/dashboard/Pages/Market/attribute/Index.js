'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteAttributeMutation, useGetAllAttributeQuery } from "@/services/market/categoryAttributeApi";
 

const Index = () => {
    const  columns =[
      {key:'name', label:'نام'},
      {key:'category' , label:'دسته بندی' , render:(value)=>value.name}, 
      {key:'unit' ,label:'واحد'},
      {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'فرم کالا'} query={useDeleteAttributeMutation} id={row.id} title={row.name} />}
    ]

    return (
      <CustomTable 
        title={'فرم کالا'}
        sitemap={'بخش فروش/ویترین/فرم کالا'}
        query={useGetAllAttributeQuery}
        columns={columns}
          /> 
           
    )
}
export default Index;