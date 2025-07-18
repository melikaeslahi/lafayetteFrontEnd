'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify";
import Link from "next/link";
import { useDeleteProductColorMutation, useGetAllProductColorQuery } from "@/lib/market/productColorApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";

const Index = ({params}) => {

    const dispatch = useDispatch();
    const { page, perPage, search } = useSelector((state) => state.util);
    const { data:  productColors = [], isLoading, isSuccess , isError  } =   useGetAllProductColorQuery({ page, perPage, params , search  });
    const [deleteProductColor, {result:deleteResult}] =  useDeleteProductColorMutation();

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);
    
    useEffect(() => {
        dispatch(setIsSuccess(isSuccess));
    }, [isSuccess]);

    useEffect(() => {
        dispatch(setIsError(isError));
    }, [isError]);
    useEffect(() => { 
        dispatch(setItemLength(productColors.data?.length));
    }, [productColors]);

    useEffect(() => {
        useToast({result:deleteResult , message:'رنگ محصول'})
    }, [deleteResult]);

    

 

    return (
    <>
        <TableHeader 
        title={'رنگ ها'}
        href={`/dashboard/market/product/productColor/create/${params}`}
        sitemap={'بخش فروش / ویترین / محصولات /رنگ ها '}
        />

        <TableContainer
            pagination={productColors?.meta}
            deleteRecord={deleteProductColor}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  محصول </th>
                        <th className="pl-3 py-3">  نام  رنگ </th>
                        <th className="pl-3 py-3">  کد  رنگ </th>
                        <th className="pl-3 py-3">   افزایش قیمت    </th>                      
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody >
            {productColors.data?.map((productColor, index) => {
           
                return (
                    <> 
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{productColor.product?.name}</td>
                        <td className="pl-3 py-3">{productColor.color_name}</td>
                        <td className="pl-3 py-3">{productColor.color}</td>
                        <td className="pl-3 py-3">{productColor.price_increase ? productColor.price_increase : 'ندارد' }</td>
                        <td>            
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([productColor.product?.name, productColor.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                        </td>
                    </tr>                  
                     </>)
            })}
                </tbody>    
             </Table>}
        </TableContainer>
      
    </>
    )
}
export default Index;