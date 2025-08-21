'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteProductSizeMutation, useGetAllProductSizeQuery } from "@/lib/market/productSizeApi";
 
const Index = ({params}) => {    
    const  columns =[
        {key:'product', label:'نام محصول' , render:(value)=>value?.name},
        {key:'size_name', label:'نام سایز'},
        {key:'size', label:'سایز'},
        {key:'price_increase', label:'افزایش قیمت', render:(value)=> value ? value: 'ندارد'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><> <SettingRecord message={'سایز محصول'} query={useDeleteProductSizeMutation} edit={false} id={row.id} title={row.product?.name} />
           
        </>}
      ]
    return (
      <CustomTable 
        title={' سایز ها'}
        href={`/dashboard/market/product/productColor/create/${params}`}
        sitemap={'بخش فروش / ویترین / محصولات /سایز ها '}
        query={useGetAllProductSizeQuery}
        columns={columns} /> 
    )
}
export default Index;