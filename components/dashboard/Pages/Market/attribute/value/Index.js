'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteValueMutation, useGetAllValueQuery } from "@/lib/market/categoryValueApi";
 
const Index = ({params}) => {   
    const  columns =[
        {key:'value', label:'مقدار',render:(_,row)=>JSON.parse(row.value).value},
        {key:'product' , label:'نام محصول' , render:(_ , row)=>row.product.name }, 
        {key:'category_attribute' ,label:'نام فرم', render:(_ , row)=>row.category_attribute?.name} , 
        {key:'type' ,label:'تابپ' ,render:(_,row)=>row.type == 1 ? 'ساده ' : 'انتخابی' },
        {key:'value' ,label:'افزایش قیمت',render:(_,row)=>JSON.parse(row.value).price_increase},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'ویژگی'} query={useDeleteValueMutation} id={row.id} title={JSON.parse(row.value).value} />}
      ]

    return (
         <CustomTable 
            title={'ویژگی ها'}
            href={`/dashboard/market/attribute/value/create/${params}`}
            sitemap={'بخش فروش/ویترین/فرم کالاها/ویژگی ها'}  
            query={useGetAllValueQuery}
            columns={columns} /> 
    )
}
export default Index;