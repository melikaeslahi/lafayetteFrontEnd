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
import { useChangeTicketCategoryStatusMutation, useDeleteTicketCategoryMutation, useGetAllTicketCategoryQuery } from "@/lib/ticket/ticketCategoryApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllTicketCategoryQuery({ page, perPage, search });
    const categories = query?.data;
    const [chengeStatus, { data: dataStatus }] =  useChangeTicketCategoryStatusMutation();
 
    const [deleteCategory, result] =  useDeleteTicketCategoryMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
       useToast({result : result , message:'دسته بندی'});
    }, [result]);

    useEffect(() => {
       useToast({dataStatus:dataStatus , message:'دسته بندی'});
    }, [dataStatus])

    return (<>
        <TableHeader 
         title={'دسته بندی ها'}
         href={`${pathname}/create`}
         sitemap={'بخش  تیکت ها/ دسته بندی  تیکت ها'}
        />
         
        <TableContainer
            pagination={categories?.meta}
            deleteRecord={deleteCategory}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام دسته </th>       
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {categories.data?.map((category) => {    
                return (
                    <tr key={category.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{category.id}</td>
                        <td className="pl-3 py-3">{category.name}</td>          
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={category.status === 1 ? true : false} onChange={() => handlerStatus(category.id)} />}
                        </td>               
                        <td>
                            <Link href={`${pathname}/edit/${category.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([category.name, category.id]))
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