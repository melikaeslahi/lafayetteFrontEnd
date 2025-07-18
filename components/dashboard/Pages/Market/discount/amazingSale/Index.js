'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useDeleteAmazingSaleMutation, useGetAllAmazingSaleQuery } from "@/lib/market/amazingSaleApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => { 
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const { data: amazingSales = [], isError, isLoading, isSuccess } =  useGetAllAmazingSaleQuery({ page, perPage, search });
    const [deleteAmazingSale, {result:deleteResult}] =  useDeleteAmazingSaleMutation();
 
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
        dispatch(setItemLength(amazingSales.data?.length));
    }, [amazingSales]);


    useEffect(() => {
         useToast({result:deleteResult , message:'تخفیف شگفت انگیز'})
    }, [deleteResult]);

    
    return (<>
        <TableHeader 
         title={' فروش فوق العاده'}
         href={`${pathname}/create`}
         sitemap={'بخش فروش/ویترین/ تخفیف ها / فروش فوقالعاده'}
        />
        
        <TableContainer
            pagination={amazingSales?.meta}
            deleteRecord={deleteAmazingSale}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  محصول </th>
                        <th className="pl-3 py-3">    درصد تخفیف   </th>
                        <th className="pl-3 py-3">   تاریخ شروع   </th>
                        <th className="pl-3 py-3">      تاریخ پایان     </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {amazingSales.data?.map((amazingSale, index) => {
                
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{amazingSale.product.name}</td>
                        <td className="pl-3 py-3">{amazingSale.percentage}</td>
                        <td className="pl-3 py-3">{amazingSale.start_date}</td>
                        <td className="pl-3 py-3">{amazingSale.end_date}</td>
                        <td>
                            <Link href={`${pathname}/edit/${amazingSale.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([amazingSale.product.name, amazingSale.id]))
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