'use client'
import { CustomTable, ShowImage, StatusRecord } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faEllipsisV, faImage, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
 
import { useChangeProductStatusMutation, useChangeMarketableMutation, useDeleteProductMutation, useGetAllProductQuery } from "@/lib/market/productApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [setting , setSetting] = useState(false);
    const [ settingId , setSettingId] = useState('');

    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllProductQuery({ page, perPage, search });
    const products = query?.data;

    const [changeStatus, { data: dataStatus }] = useChangeProductStatusMutation();
    const [changeMarketable, { data:  dataMarketable }] = useChangeMarketableMutation();

    const [deleteProduct, result] = useDeleteProductMutation();

    const  columns =[
        {key:'name', label:'نام محصول'},
        {key:'image' , label:'تصویر' , render:(value)=><ShowImage image={value} />}, 
        {key:'status' ,label:'وضعیت', render:(value , row)=><StatusRecord status={value} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'marketable' ,label:'قابلیت فروش', render:(value , row)=><StatusRecord status={value} id={row.id} changeStatus={changeMarketable}/> } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'tags' ,label:'برچسب ها'},
        {key:'parent' ,label:'دسته والد', render:(value)=>value !== null ? value.name : 'دسته اصلی'},
        {key:'brand',label:'برند' ,render:(value)=>{value?.persian_name}},
        {key:'slug',label:'اسلاگ'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=>
        <>
         <button 
          onClick={()=>handlerSetting(row.id)} 
          className="py-2 px-4   rounded ">  
            <FontAwesomeIcon icon={faEllipsisV} />
         </button> 
         <section 
         className={`${setting && settingId == row.id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
           <Link href={`${pathname}/edit/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faEdit} />  ویرایش     </Link>
           <Link href={`${pathname}/gallery/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />   گالری تصاویر     </Link>
           <Link href={`${pathname}/productColor/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />     رنگ ها     </Link>
           <Link href={`${pathname}/productSize/${row.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />      سایز ها     </Link>
           <Button 
           type="button" 
           onClick={() => {
             dispatch(setHandlerModal([row.name, row.id]))
             dispatch(modalOpenClose(true));}} 
           className="py-2 px-4 rounded text-right"> 
           <FontAwesomeIcon icon={faTrash} />  حذف   </Button>
         </section>
        </>
        }
      ]

    const handlerStatus = async (id) => {
        await changeStatus(id);
    }

    const handlerMarketable = async (id) => {
        await changeMarketable(id);
    }

    const handlerSetting = (productId) =>{
       setSetting(!setting);
       setSettingId(productId)
    }

    useEffect(() => {
       useToast({result:result , message:'محصول'})
    }, [result]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'محصول'})
    }, [dataStatus]);

    useEffect(() => {
       useToast({dataStatus:dataMarketable , message:'قابلیت فروش محصول'})
    }, [dataMarketable])

    return ( 
      <CustomTable 
         title={'محصولات'}
         sitemap={'بخش فروش/ویترین/ محصولات'}
         pagination={products?.meta}
         deleteRecord={deleteProduct}
         data={query}
         columns={columns} /> 
            
    )
}
export default Index;