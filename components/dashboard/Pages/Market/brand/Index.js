'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname  } from "next/navigation";
import { useChangeBrandStatusMutation, useDeleteBrandMutation, useGetAllBrandQuery } from "@/lib/market/brandApi";
import useToast from "@/hooks/useToast";

const headers =['نام فارسی' , 'نام اصلی' , 'لوگو' , 'وضعیت' , 'برچسب ها' , 'اسلاگ'];
 
const Index = () => {   
 
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =  useGetAllBrandQuery({ page, perPage, search });
    const brands=query?.data;
    const [changeStatus, { data: dataStatus }] =   useChangeBrandStatusMutation();
    const [deleteBrand, {result:deleteResult}] =   useDeleteBrandMutation();

    useEffect(() => {
        useToast({result:deleteResult , message:'برند'});
    }, [deleteResult]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:'برند'})
    }, [dataStatus])

    return (<>
        <TableHeader 
        title={'برند ها'}
        href={`${pathname}/create`}
        sitemap={'بخش فروش/ویترین/برند ها'}
        />
        
        <TableContainer
            pagination={brands?.meta}
            deleteRecord={deleteBrand}
            query={query}
        >
        {<CustomTable headers={headers}>     
            {brands.data?.map((brand) => {
               
                return (
                    <tr key={brand.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{brand.id}</td>
                        <td className="pl-3 py-3">{brand.persian_name}</td>
                        <td className="pl-3 py-3">{brand.original_name}</td>
                        <td className="pl-3 py-3"> <ShowImage image={brand.image} /></td>
                        <td className="pl-3 py-3">
                            <StatusRecord id={brand.id} status={brand.status} changeStatus={changeStatus} />
                        </td>
                        <td className="pl-3 py-3">{brand.tags}</td>
                        <td className="pl-3 py-3">{brand.slug}</td>
                        <td><SettingRecord id={brand.id} title={brand.persian_name} /></td>
                    </tr>)
            })}
        </CustomTable>}
     </TableContainer>
    </>
    )
}
export default Index;