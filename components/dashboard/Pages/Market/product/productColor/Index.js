'use client'
import { CustomTable } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteProductColorMutation, useGetAllProductColorQuery } from "@/lib/market/productColorApi";
import useToast from "@/hooks/useToast";


const Index = ({params}) => {

    const dispatch = useDispatch();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =   useGetAllProductColorQuery({ page, perPage, params , search  });
    const  productColors =query?.data;
    const [deleteProductColor, {result:deleteResult}] =  useDeleteProductColorMutation();

    const  columns =[
        {key:'product', label:'نام محصول' , render:(value)=>value?.name},
        {key:'color_name', label:'نام رنگ'},
        {key:'color', label:'کد رنگ'},
        {key:'price_increase', label:'افزایش قیمت', render:(value)=> value ? value: 'ندارد'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><>
           <Button type="button" 
             onClick={() => {
             dispatch(setHandlerModal([row.product?.name, row.id]))
             dispatch(modalOpenClose(true));}} 
             className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">
             <FontAwesomeIcon icon={faTrash} />
           </Button>
        </>}
      ]
  

    useEffect(() => {
        useToast({result:deleteResult , message:'رنگ محصول'})
    }, [deleteResult]);
 

    return (
   
            <CustomTable 
             title={'رنگ ها'}
             href={`/dashboard/market/product/productColor/create/${params}`}
             sitemap={'بخش فروش / ویترین / محصولات /رنگ ها '}
             columns={columns}
             pagination={productColors?.meta}
             deleteRecord={deleteProductColor}
             data={query} />
    )
}
export default Index;