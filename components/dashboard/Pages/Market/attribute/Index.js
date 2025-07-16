'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useDeleteAttributeMutation, useGetAllAttributeQuery } from "@/lib/market/categoryAttributeApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const { data:  attributes = [], isError, isLoading, isSuccess } =  useGetAllAttributeQuery({ page, perPage, search });
    const [deleteAttribute, {result:deleteResult}] =  useDeleteAttributeMutation();

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
        dispatch(setItemLength(attributes.data?.length));
    }, [attributes]);


    useEffect(() => {
      useToast({result:deleteResult , message:'فرم کالا'})
    }, [deleteResult]);

    return (<>
        <TableHeader 
        title={'فرم کالا'}
        href={`${pathname}/create`}
        sitemap={'بخش فروش/ویترین/فرم کالا'}
        />

        <TableContainer
            pagination={attributes?.meta}
            deleteRecord={deleteAttribute}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام   </th>
                        <th className="pl-3 py-3">     دسته بندی   </th>
                        <th className="pl-3 py-3">   واحد   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {attributes.data?.map((attribute, index) => {
                
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{attribute.name}</td>               
                        <td className="pl-3 py-3">{attribute.category.name}</td>
                        <td className="pl-3 py-3">{attribute.unit}</td>                       
                        <td>
                            <Link href={`${pathname}/edit/${attribute.id}`}  className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Link href={`${pathname}/value/${attribute.id}`} className="py-2 px-4 bg-blue-500 hover:bg-blue-600  rounded text-white">   ویژگی ها     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([attribute.name, attribute.id]))
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