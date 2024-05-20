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
 
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useDeleteValueMutation, useGetAllValueQuery } from "@/lib/market/categoryValueApi";
const Index = ({params}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage  } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  values = [], isError, isLoading, isSuccess } =  useGetAllValueQuery({ page, perPage , params  });

 

    const [deleteValue, result] =  useDeleteValueMutation();

  

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(values.data?.length));

    }, [isLoading, isSuccess, isError, values])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('دسته بندی محصولات با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

   
 

    return (<>
        <TitlePage
            name='   ویژگی ها  '
            sitemapPage='بخش فروش/ویترین/ فرم کالا ها / ویژگی ها'

        >
            <Link
                href={`/dashboard/market/attribute/value/create/${params}`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد ویژگی جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={values?.meta}
            deleteRecord={deleteValue}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   مقدار   </th>
                        <th className="pl-3 py-3">     نام محصول   </th>
                        <th className="pl-3 py-3">   نام فرم   </th>
                        <th className="pl-3 py-3">    تایپ     </th>
                        <th className="pl-3 py-3">    افزایش قیمت   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {values.data?.map((value, index) => {
                
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{JSON.parse(value.value).value  }</td>
                        <td className="pl-3 py-3">{value.product.name }</td>
                        <td className="pl-3 py-3">{value.category_attribute?.name }</td>
                        <td className="pl-3 py-3">{value.type == 1 ? 'ساده ' : 'انتخابی'}</td>

                        <td className="pl-3 py-3">{  JSON.parse(value.value).price_increase   }</td>



                        
                         
                         
                        
                        <td>
                            <Link href={`/dashboard/market/attribute/value/edit/${params}/${value.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([JSON.parse(value.value).value, value.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
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