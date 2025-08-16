'use client'
import { CustomTable, ShowImage } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteGalleryMutation, useGetAllGalleryQuery } from "@/lib/market/galleryApi";
import useToast from "@/hooks/useToast";
 

const Index = ({params}) => {
    const dispatch = useDispatch();
    const { page, perPage  } = useSelector((state) => state.util);
    const  query =  useGetAllGalleryQuery({ page, perPage , params});
    const galleries = query?.data;
    const [deleteImage, {result:deleteResult}] =  useDeleteGalleryMutation();

    const  columns =[
        {key:'product_id', label:'نام محصول' ,render:(value)=>value.name},
        {key:'image' , label:'تصویر' , render:(value)=><ShowImage image={value} />},
        {key:'setting' , label:'تنظیمات', render:(_,row)=> <>
        <Button 
          type="button" 
          onClick={() =>
             {dispatch(setHandlerModal([row.product_id.name, row.id]))
              dispatch(modalOpenClose(true));}}
          className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white"> 
         <FontAwesomeIcon icon={faTrash} /> 
        </Button>
        </>}
      ]

    useEffect(() => { 
         useToast({result:deleteResult , message:'گالری'})
    }, [deleteResult]);
    
    return (
      <CustomTable
         title={'گالری تصاویر'}
         href={`/dashboard/market/product/gallery/create/${params}`}
         sitemap={'بخش فروش / ویترین / محصولات / گالری'}
         pagination={galleries?.meta}
         deleteRecord={deleteImage}
         data={query}
         columns={columns} /> 
            
    )
}
export default Index;