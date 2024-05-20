'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faEllipsis, faEllipsisV, faImage, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useDeleteProductColorMutation, useGetAllProductColorQuery } from "@/lib/market/productColorApi";
const Index = ({params}) => {
 
    const dispatch = useDispatch();
   
 

    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  productColors = [], isLoading, isSuccess , isError  } =   useGetAllProductColorQuery({ page, perPage, params , search  });

 

    const [deleteProductColor, result] =  useDeleteProductColorMutation();

    

   

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(productColors.data?.length));

    }, [isLoading, isSuccess, isError, productColors])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success(' محصول  با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

    

 

    return (<>
        <TitlePage
            name=' رنگ ها'
            sitemapPage='    بخش فروش / ویترین / محصولات /رنگ ها '

        >
            <Link
                href={`/dashboard/market/product/productColor/create/${params}`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد   رنگ جدید
            </Link>
        </TitlePage>

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