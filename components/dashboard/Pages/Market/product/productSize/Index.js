'use client'
import { CustomTable } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect  } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteProductSizeMutation, useGetAllProductSizeQuery } from "@/lib/market/productSizeApi";
import useToast from "@/hooks/useToast";

const Index = ({params}) => {
    const dispatch = useDispatch();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query = useGetAllProductSizeQuery({ page, perPage, params , search  });
    const productSizes =query?.data;
    const [deleteProductSize, {result:deleteResult}] =   useDeleteProductSizeMutation();
     
    const  columns =[
        {key:'product', label:'نام محصول' , render:(value)=>value?.name},
        {key:'size_name', label:'نام سایز'},
        {key:'size', label:'سایز'},
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
         useToast({result:deleteResult , message:'سایز محصول'})
    }, [deleteResult]);

    return (
      <CustomTable 
        title={' سایز ها'}
        href={`/dashboard/market/product/productColor/create/${params}`}
        sitemap={'بخش فروش / ویترین / محصولات /سایز ها '}
        pagination={productSizes?.meta}
        deleteRecord={deleteProductSize}
        data={query}
        columns={columns} /> 
    )
}
export default Index;