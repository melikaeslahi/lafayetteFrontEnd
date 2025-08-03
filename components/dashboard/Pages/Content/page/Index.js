'use client'
import { CustomTable, SettingRecord, StatusRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChangePageStatusMutation, useDeletePageMutation, useGetAllPageQuery } from "@/lib/content/pageApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";

const headers =['عنوان صفحه','بدنه صفحه','وضعیت','برچسب ها','اسلاگ']

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllPageQuery({ page, perPage, search });
    const pages = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangePageStatusMutation();
    const [deletePage, {result:deleteResult}] =  useDeletePageMutation();


    useEffect(() => {
        useToast({result:deleteResult , message:'پیج ساز'})
    }, [deleteResult]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:"پیج ساز"})
    }, [dataStatus])

    return (<>
       <TableHeader 
       title={'پیج ساز'}
       href={`${pathname}/create`}
       sitemap={'بخش محتوایی /پیج ساز'}
       />

        <TableContainer
            pagination={ pages?.meta}
            deleteRecord={deletePage}
            query={query}
        >
            {<CustomTable headers={headers}>    
                    {pages.data?.map((page) => { 
                        return (
                            <tr key={page.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{page.id}</td>
                                <td className="pl-3 py-3">{page.title}</td>
                                <td className="pl-3 py-3">{page.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">
                                    <StatusRecord id={page.id}
                                      status={page.status}
                                      changeStatus={changeStatus}
                                    />
                                </td>
                                <td className="pl-3 py-3">{page.tags}</td> 
                                <td className="pl-3 py-3">{page.slug}</td>
                                <td>
                                    <SettingRecord id={page.id} title={page.title}/>
                                </td>
                            </tr>)
                    })}</CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;