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
import { useChangePageStatusMutation, useDeletePageMutation, useGetAllPageQuery } from "@/lib/content/pageApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllPageQuery({ page, perPage, search });
    const pages = query?.data;

    const [chengeStatus, { data: dataStatus }] =  useChangePageStatusMutation();
    const [deletePage, {result:deleteResult}] =  useDeletePageMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

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
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   عنوان صفحه </th>
                        <th className="pl-3 py-3">   بدنه صفحه  </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">       برچسب ها    </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {pages.data?.map((page) => {
                       
                        return (
                            <tr key={page.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{page.id}</td>
                                <td className="pl-3 py-3">{page.title}</td>
                                <td className="pl-3 py-3">{page.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={page.status === 1 ? true : false} onChange={() => handlerStatus(page.id)} />}
                                </td>
                            
                                <td className="pl-3 py-3">{page.tags}</td> 
                                <td className="pl-3 py-3">{page.slug}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${page.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([page.title, page.id]))
                                        dispatch(modalOpenClose(true));
                                    }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                                </td>
                            </tr>)
                    })}</tbody> </Table>}
        </TableContainer>
    </>
    )
}
export default Index;