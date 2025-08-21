'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteProductColorMutation, useGetAllProductColorQuery } from "@/lib/market/productColorApi";
 

const Index = ({params}) => {
    const  columns =[
        {key:'product', label:'نام محصول' , render:(value)=>value?.name},
        {key:'color_name', label:'نام رنگ'},
        {key:'color', label:'کد رنگ'},
        {key:'price_increase', label:'افزایش قیمت', render:(value)=> value ? value: 'ندارد'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'رنگ محصول'} query={useDeleteProductColorMutation} edit={false} title={row.product?.name} id={row.id} />}
      ]

    return (
   
            <CustomTable 
             title={'رنگ ها'}
             href={`/dashboard/market/product/productColor/create/${params}`}
             sitemap={'بخش فروش / ویترین / محصولات /رنگ ها '}
             columns={columns}
             query={useGetAllProductColorQuery} />
    )
}
export default Index;