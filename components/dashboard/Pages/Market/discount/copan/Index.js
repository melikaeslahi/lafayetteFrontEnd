'use client'
import { CustomTable, SettingRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDeleteCopanMutation, useGetAllCopanQuery } from "@/lib/market/copanApi";
import useToast from "@/hooks/useToast";

const headers =['کد کپن', 'نوع تخفیف', 'تخفیف برای', 'میزان تخفیف', 'حداکثر تخفیف', 'تاریخ شروع', 'تاریخ پایان']

const Index = () => {
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
          <CustomTable headers={headers}> 
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
                        <td> <SettingRecord id={copan.id} title={copan.code} /></td>
                    </tr>)
            })}    
             </CustomTable>
        </TableContainer>
    </>
    )
}
export default Index;