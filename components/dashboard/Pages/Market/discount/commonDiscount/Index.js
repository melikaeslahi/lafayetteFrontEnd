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
import { useDeleteCommonDiscountMutation, useGetAllCommonDiscountQuery } from "@/lib/market/commonDiscountApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => { 
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllCommonDiscountQuery({ page, perPage, search });
    const commonDiscounts = query?.data;
    const [deleteCommonDiscount, {result:deleteResult}] =  useDeleteCommonDiscountMutation();

    useEffect(() => {
         useToast({result:deleteResult , message:"تخفیف"})
    }, [deleteResult]);

    return (<>
       <TableHeader 
        title={'تخفیف عمومی'}
        href={`${pathname}/create`}
        sitemap={'بخش فروش/ویترین/ تخفیف ها /تخفیف های عمومی'}
       />
      
        <TableContainer
            pagination={commonDiscounts?.meta}
            deleteRecord={deleteCommonDiscount}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   عنوان تخفیف   </th>
                        <th className="pl-3 py-3">   درصد تخفیف   </th>
                        <th className="pl-3 py-3">    حدااکثر تخفیف   </th>
                        <th className="pl-3 py-3">    سفف خرید </th>
                        <th className="pl-3 py-3">    تاریخ شروع </th>
                        <th className="pl-3 py-3">      تاریخ پایان </th>               
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {commonDiscounts.data?.map((commonDiscount) => {      
                return (
                    <tr key={commonDiscount.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{commonDiscount.id}</td>
                        <td className="pl-3 py-3">{commonDiscount.title}</td>
                        <td className="pl-3 py-3">{commonDiscount.percentage}%</td>
                        <td className="pl-3 py-3">{commonDiscount.discount_ceiling}</td>
                        <td className="pl-3 py-3">{commonDiscount.minimal_order_amount} تومان</td>
                        <td className="pl-3 py-3">{commonDiscount.start_date}</td>
                        <td className="pl-3 py-3">{commonDiscount.end_date}</td>

                        <td>
                            <Link href={`${pathname}/edit/${commonDiscount.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([commonDiscount.title, commonDiscount.id]))
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