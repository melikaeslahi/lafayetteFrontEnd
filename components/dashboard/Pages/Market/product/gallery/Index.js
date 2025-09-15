'use client'
import { CustomTable, SettingRecord, ShowImage } from "@/components/dashboard/Table";
import { useDeleteGalleryMutation, useGetAllGalleryQuery } from "@/services/market/galleryApi";


const Index = ({params}) => {
    const  columns =[
        {key:'product_id', label:'نام محصول' ,render:(value)=>value.name},
        {key:'image' , label:'تصویر' , render:(value)=><ShowImage image={value} />},
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <SettingRecord edit={false} id={row.id} title={row.product_id.name} message={'گالری'} query={useDeleteGalleryMutation} />}
      ]

    return (
      <CustomTable
         title={'گالری تصاویر'}
         href={`/dashboard/market/product/gallery/create/${params}`}
         sitemap={'بخش فروش / ویترین / محصولات / گالری'}
         query={useGetAllGalleryQuery}
         columns={columns} /> 
            
    )
}
export default Index;