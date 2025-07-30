'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import {  faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useChangeTicketAdminStatusMutation, useGetAllTicketAdminQuery } from "@/lib/ticket/ticketAdminApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllTicketAdminQuery({ page, perPage, search });
    const admins = query?.data;
    const [chengeStatus, { data: dataStatus }] = useChangeTicketAdminStatusMutation();
       
    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }
 
    useEffect(() => {
           let message;
            if (dataStatus?.status === 200) {
                 message=' تیکت ادمین تغییر کرد '          
            }
            useToast({dataStatus: dataStatus , customMessage:message})
    }, [dataStatus])

    return (<>
        <TableHeader 
         title={'  تیکت ادمین'}
         href={`${pathname}/create`}
         sitemap={'بخش  تیکت ها/  تیکت ادمین'}
        />
         
        <TableContainer
            pagination={ admins?.meta}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   نام ادمین </th>
                        <th className="pl-3 py-3">    ایمیل ادمین </th>
                    </tr>
                </thead>
                <tbody>
            { admins.data?.map((admin) => {
                return (
                    <tr key={admin.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{admin.id}</td>
                        <td className="pl-3 py-3">{admin.first_name} {admin.last_name } </td>                  
                        <td className="pl-3 py-3">{admin.email}</td>
                        <td>  
                            <Button type="button" onClick={() => {
                               handlerStatus(admin.id)
                            }} className={`py-2 px-4 ${ admin.admin == null ? 'bg-green-500 hover:bg-green-600' :  `bg-red-500 hover:bg-red-600`} rounded text-white`}>  <FontAwesomeIcon icon={faTrash} />     </Button>
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