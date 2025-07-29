'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect  } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteProductSizeMutation, useGetAllProductSizeQuery } from "@/lib/market/productSizeApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = ({params}) => {
    const dispatch = useDispatch();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query = useGetAllProductSizeQuery({ page, perPage, params , search  });
    const productSizes =query?.data;
    const [deleteProductSize, {result:deleteResult}] =   useDeleteProductSizeMutation();

    useEffect(() => {
         useToast({result:deleteResult , message:'سایز محصول'})
    }, [deleteResult]);

    return (<>
        <TableHeader  
        title={' سایز ها'}
        href={`/dashboard/market/product/productColor/create/${params}`}
        sitemap={'بخش فروش / ویترین / محصولات /سایز ها '}
        />
    
        <TableContainer
            pagination={productSizes?.meta}
            deleteRecord={deleteProductSize}
            query={query}
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
            {productSizes.data?.map((productSize) => {
                return (
                    <> 
                    <tr key={productSize} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{productSize.id}</td>
                        <td className="pl-3 py-3">{productSize.product?.name}</td>
                        <td className="pl-3 py-3">{productSize.size_name}</td>
                        <td className="pl-3 py-3">{productSize.size}</td>
                        <td className="pl-3 py-3">{productSize.price_increase ? productSize.price_increase : 'ندارد' }</td>
                        <td>                            
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([productSize.product?.name, productSize.id]))
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