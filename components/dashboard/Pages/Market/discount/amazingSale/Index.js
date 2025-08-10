'use client'
import { CustomTable, SettingRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { useDeleteAmazingSaleMutation, useGetAllAmazingSaleQuery } from "@/lib/market/amazingSaleApi";
import useToast from "@/hooks/useToast";
 
const headers = ['نام  محصول' , ' درصد تخفیف' , 'تاریخ شروع' , 'تاریخ پایان' ]

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllAmazingSaleQuery({ page, perPage, search });
    const amazingSales =query?.data;
    const [deleteAmazingSale, {result:deleteResult}] =  useDeleteAmazingSaleMutation();

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
            query={query}
        >
        {<CustomTable headers={headers}> 
            {amazingSales.data?.map((amazingSale) => { 
                return (
                    <tr key={amazingSale.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full border-b-2 border-pallete">
                        <td className="pl-3 py-3">{amazingSale.id}</td>
                        <td className="pl-3 py-3">{amazingSale.product.name}</td>
                        <td className="pl-3 py-3">{amazingSale.percentage}</td>
                        <td className="pl-3 py-3">{amazingSale.start_date}</td>
                        <td className="pl-3 py-3">{amazingSale.end_date}</td>
                        <td><SettingRecord id={amazingSale.id} title={amazingSale.product.name} /></td>
                    </tr>)
            })} 
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;