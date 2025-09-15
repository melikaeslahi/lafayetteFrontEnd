'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { faEllipsisV, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChangeProductStatusMutation, useChangeMarketableMutation, useDeleteProductMutation, useGetAllProductQuery } from "@/services/market/productApi";
import Link from "next/link";
 
const Index = () => {
    const pathname = usePathname();
    const [setting , setSetting] = useState(false);
    const [ settingId , setSettingId] = useState('');

    const  columns =[
        {key:'name', label:'نام محصول'},
        {key:'image' , label:'تصویر' , render:(value)=><ShowImage image={value} />}, 
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord message={'محصول'} query={useChangeProductStatusMutation} status={value} id={row.id} /> } , 
        {key:'marketable' ,label:'قابلیت فروش', render:(value , row)=><StatusRecord message={'قابلیت فروش محصول'} query={useChangeMarketableMutation} name="marketable" status={value} id={row.id}  /> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'tags' ,label:'برچسب ها'},
        {key:'parent' ,label:'دسته والد', render:(value)=>value !== null ? value.name : 'دسته اصلی'},
        {key:'brand',label:'برند' ,render:(value)=>{value?.persian_name}},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=>
        <>
         <button 
          onClick={()=>handlerSetting(row.id)} 
          className="py-2 px-4 rounded ">  
            <FontAwesomeIcon icon={faEllipsisV} />
         </button> 
         <section 
         className={`${setting && settingId == row.id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
           <SettingRecord id={row.id} title={row.name} query={useDeleteProductMutation} message={'محصول'} />
           <Link href={`${pathname}/gallery/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />   گالری تصاویر     </Link>
           <Link href={`${pathname}/productColor/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />     رنگ ها     </Link>
           <Link href={`${pathname}/productSize/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />      سایز ها     </Link>
        
         </section>
        </>
        }
      ]

    const handlerSetting = (productId) =>{
       setSetting(!setting);
       setSettingId(productId)
    }
    return ( 
      <CustomTable 
         title={'محصولات'}
         sitemap={'بخش فروش/ویترین/ محصولات'}
         query={useGetAllProductQuery}
         columns={columns} /> 
            
    )
}
export default Index;