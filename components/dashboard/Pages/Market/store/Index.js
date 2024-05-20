'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useGetAllProductQuery } from "@/lib/market/storeApi";
const Index = () => {
   
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  products = [], isError, isLoading, isSuccess } =  useGetAllProductQuery({ page, perPage, search });

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(products.data?.length));

    }, [isLoading, isSuccess, isError, products])

 

    return (<>
        <TitlePage
            name='دسته بندی ها'
            sitemapPage='بخش فروش/ویترین/دسته بندی ها'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" disabled >
                {' '}
                ایجاد  انبار جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={products?.meta}
            
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام محصول </th>
                        <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">   تعداد قابل فروش    </th>
                        <th className="pl-3 py-3">      تعداد فروخته شده     </th>
                        <th className="pl-3 py-3">   تعداد رزرو شده </th>
                      
                    </tr>
                </thead>
                <tbody>
            {products.data?.map((product, index) => {
                const indexArray = Object.entries(product.image.indexArray);
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{product.name}</td>
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            product.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        
                        
                        
                        <td className="pl-3 py-3">{product.marketable_number}</td>
                        <td className="pl-3 py-3">{product.sold_number}</td>
                        <td className="pl-3 py-3">{product.frozen_number}</td>

                       
                        <td>
                        <Link href={`${pathname}/create/${product.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   ایجاد      </Link>

                            <Link href={`${pathname}/edit/${product.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                             
                        </td>
                    </tr>)
            })}
                </tbody>    
             </Table>}
        </TableContainer>
    </>
    )
}
export default Index;