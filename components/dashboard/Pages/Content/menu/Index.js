'use client'
import { CustomTable, SettingRecord, StatusRecord,  TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChangeMenuStatusMutation, useDeleteMenuMutation, useGetAllMenusQuery } from "@/lib/content/menuApi";
import useToast from "@/hooks/useToast";
 
const headers = ['نام منو' , 'آدرس', 'وضعیت' ,'منو والد']

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

     //fetch menus
    const  query = useGetAllMenusQuery({ page, perPage, search });
    const menus =query?.data;
    const [changeStatus, { data: dataStatus }] =   useChangeMenuStatusMutation();
    const [deleteMenu, result] =  useDeleteMenuMutation();

    useEffect(() => {
       useToast({result:result , message:"منو"})
    }, [result]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:"منو"})

    }, [dataStatus])

    return (<>
    <TableHeader 
    title={'منو ها'}
    href={`${pathname}/create`}
    sitemap={'بخش محتوایی / منو ها'}
    />
        <TableContainer
            pagination={menus?.meta}
            deleteRecord={deleteMenu}
            query={query}
        >
            {<CustomTable headers={headers}>
                {menus.data?.map((menu) => {   
                    return (
                        <tr key={menu.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                            <td className="pl-3 py-3">{menu.id}</td>
                            <td className="pl-3 py-3">{menu.name}</td>
                            <td className="pl-3 py-3">{menu.url}</td>  
                            <td className="pl-3 py-3">
                                <StatusRecord id={menu.id}
                                    status={menu.status}
                                    changeStatus={changeStatus}
                                 />
                            </td>       
                            <td className="pl-3 py-3">
                                {menu.parent !== null ? menu.parent.name : ' منو اصلی'}
                            </td>
                            <td>
                                <SettingRecord  id={menu.id} title={menu.name} />
                            </td>
                        </tr>)
                })} 
            </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;