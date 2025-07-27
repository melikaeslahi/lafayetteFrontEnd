'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useDeleteValueMutation, useGetAllValueQuery } from "@/lib/market/categoryValueApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";

const Index = ({params}) => {
    const dispatch = useDispatch();
    const { page, perPage  } = useSelector((state) => state.util);
    
    const query =  useGetAllValueQuery({ page, perPage , params  });
    const values =query?.data;

    const [deleteValue, {result:deleteResult}] =  useDeleteValueMutation();

    useEffect(() => {
      useToast({result:deleteResult , message:"ویژگی"})
    }, [deleteResult]);

    return (
    <>
    <TableHeader 
    title={'ویژگی ها'}
    href={`/dashboard/market/attribute/value/create/${params}`}
    sitemap={'بخش فروش/ویترین/فرم کالاها/ویژگی ها'}
    />
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
            {values.data?.map((value) => {
                
                return (
                    <tr key={value.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{value.id}</td>
                        <td className="pl-3 py-3">{JSON.parse(value.value).value  }</td>
                        <td className="pl-3 py-3">{value.product.name }</td>
                        <td className="pl-3 py-3">{value.category_attribute?.name }</td>
                        <td className="pl-3 py-3">{value.type == 1 ? 'ساده ' : 'انتخابی'}</td>
                        <td className="pl-3 py-3">{JSON.parse(value.value).price_increase}</td>          
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