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
import { useChangeTicketPriorityStatusMutation, useDeleteTicketPriorityMutation, useGetAllTicketPriorityQuery } from "@/lib/ticket/ticketPriorityApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllTicketPriorityQuery({ page, perPage, search });
    const priorities = query?.data;

    const [chengeStatus, { data: dataStatus }] =  useChangeTicketPriorityStatusMutation();
     
    const [deletePriority, result] =  useDeleteTicketPriorityMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
       useToast({result:result , message:'اولویت تیکت'})
    }, [result]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'اولویت تیکت'})
    }, [dataStatus])

    return (<>
      <TableHeader 
       title={' اولویت تیکت ها'}
       href={`${pathname}/create`}
       sitemap={'بخش  تیکت ها/ اولویت تیکت ها'}
      />

        <TableContainer
            pagination={priorities?.meta}
            deleteRecord={deletePriority}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  اولویت </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {priorities.data?.map((priority) => { 
                return (
                    <tr key={priority.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{priority.id}</td>
                        <td className="pl-3 py-3">{priority.name}</td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={priority.status === 1 ? true : false} onChange={() => handlerStatus(priority.id)} />}
                        </td>
                        <td>
                            <Link href={`${pathname}/edit/${priority.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([priority.name, priority.id]))
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