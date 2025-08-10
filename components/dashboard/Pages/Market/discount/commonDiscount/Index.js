'use client'
import { CustomTable, TableHeader, TableContainer, SettingRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDeleteCommonDiscountMutation, useGetAllCommonDiscountQuery } from "@/lib/market/commonDiscountApi";
import useToast from "@/hooks/useToast";


const headers =['عنوان تخفیف ' , 'درصد تخفیف ' , 'حداکثر تخفیف' ,'سفف خرید ' ,'تاریخ شروع ' ,'تاریخ پایان ' ] 

const Index = () => { 
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
        <CustomTable headers={headers}> 
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
                        <td><SettingRecord  id={commonDiscount.id} title={commonDiscount.title} /></td>
                    </tr>)
            })}    
             </CustomTable>
        </TableContainer>
    </>
    )
}
export default Index;