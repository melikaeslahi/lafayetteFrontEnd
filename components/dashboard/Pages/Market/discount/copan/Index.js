'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useDeleteCopanMutation, useGetAllCopanQuery } from "@/lib/market/copanApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";

const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =  useGetAllCopanQuery({ page, perPage, search });
    const copans = query?.data;
    const [deleteCopan, {result:deleteResult}] =  useDeleteCopanMutation();

    

    useEffect(() => {
         useToast({result:deleteResult , message:'کپن تخفیف'});
    }, [deleteResult]);

    return (<>
    <TableHeader 
    title={'کپن تخفیف'}
    href={`${pathname}/create`}
    sitemap={'بخش فروش/ویترین/ تخفیف ها / کپن تخفیف'}
    />
         
        <TableContainer
            pagination={copans?.meta}
            deleteRecord={deleteCopan}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   کد کپن  </th>
                        <th className="pl-3 py-3">   نوع تخفیف   </th>
                        <th className="pl-3 py-3">      تخفیف برای     </th>
                        <th className="pl-3 py-3">   میزان تخفیف </th>
                        <th className="pl-3 py-3">    حداکثر تخفیف   </th>
                        <th className="pl-3 py-3">    تاریخ شروع </th>
                        <th className="pl-3 py-3">     تاریخ پایان </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {copans.data?.map((copan) => {
                
                return (
                    <tr key={copan.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{copan.id}</td>
                        <td className="pl-3 py-3">{copan.code}</td>
                        <td className="pl-3 py-3">{copan.amount_type === 0 ? 'درصدی' : 'عددی' }</td>
                        <td className="pl-3 py-3">{copan.type === 0 ? 'همه' :  copan.user.first_name + copan.user.last_name }</td>
                        <td className="pl-3 py-3">{ copan.amount_type ===0 ? copan.amount + '%'  : copan.amount + 'تومان' }</td>

                        <td className="pl-3 py-3">{copan.discount_ceiling}</td>
                        <td className="pl-3 py-3">{copan.start_date}</td>
                        <td className="pl-3 py-3">{copan.end_date}</td>
                        <td>
                            <Link href={`${pathname}/edit/${copan.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([copan.code, copan.id]))
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