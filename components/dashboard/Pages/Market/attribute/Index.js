'use client'
import { CustomTable, SettingRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDeleteAttributeMutation, useGetAllAttributeQuery } from "@/lib/market/categoryAttributeApi";
import useToast from "@/hooks/useToast";

const headers = ['نام' , 'دسته بندی' , 'واحد']

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllAttributeQuery({ page, perPage, search });
    const attributes = query?.data;

    const [deleteAttribute, {result:deleteResult}] =  useDeleteAttributeMutation();

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
            query={query}
        >
          {<CustomTable headers={headers}> 
            {attributes.data?.map((attribute) => {  
                return (
                    <tr key={attribute.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                      <td className="pl-3 py-3">{attribute}</td>
                      <td className="pl-3 py-3">{attribute.name}</td>               
                      <td className="pl-3 py-3">{attribute.category.name}</td>
                      <td className="pl-3 py-3">{attribute.unit}</td>                       
                      <td><SettingRecord id={attribute.id} title={attribute.name}/></td>
                    </tr>)
            })}
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;