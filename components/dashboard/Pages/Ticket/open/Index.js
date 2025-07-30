'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useChangeMutation,  useGetOpenTicketsQuery } from "@/lib/ticket/ticketApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
 
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =   useGetOpenTicketsQuery({ page, perPage, search });
    const tickets = query?.data;

    const [chenge, { data: dataStatus }] =  useChangeMutation();
 
    const handlerChange = async (id) => {
        await chenge(id);
    }

    useEffect(() => {
        let message;
            if (dataStatus.status === true && dataStatus.checked === true) {
               message=' تیکت با موفقیت باز شد  '             
            } else if (dataStatus.status === true && dataStatus.checked === false) {
                message=' با موفقیت بسته  شد  ' 
            } else if (dataStatus.status === false) {
                message='   خطایی پیش آمده است  '     
            }
            useToast({dataStatus:dataStatus , customMessage: message})

    }, [dataStatus])

    return (<>
      <TableHeader 
        title={' تیکت ها '}
        sitemap={'بخش فروش/ویترین/   تیکت ها'}
        href={`${pathname}/create`}
      />
         
        <TableContainer
            pagination={tickets?.meta}
            query={query}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3">#</th>
                        <th className="pl-3 py-3"> نویسنده تیکت </th>
                        <th className="pl-3 py-3"> عنوان تیکت </th>
                        <th className="pl-3 py-3"> دسته تیکت </th>
                        <th className="pl-3 py-3"> اولویت </th>
                        <th className="pl-3 py-3"> ارجاع شده از</th>
                        <th className="pl-3 py-3"> تیکت مرجع </th>
                        <th className="pl-3 py-3">    وضعیت </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.data?.map((ticket) => {
                        return (
                            <tr key={ticket.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{ticket.id}</td>
                                <td className="pl-3 py-3">{ticket.user.first_name + '' + ticket.user.last_name }</td>
                                <td className="pl-3 py-3">{ticket.subject}</td>
                                <td className="pl-3 py-3">{ticket.category.name}</td>
                                <td className="pl-3 py-3">{ticket.priority.name}</td>
                                <td className="pl-3 py-3">{ticket.admin ? ticket.admin.admin.first_name + ' ' + ticket.admin.admin.last_name : 'نامشخص' }</td>
                                <td className="pl-3 py-3">{ticket.parent?.subject ?? '_' }</td>
                                <td className="pl-3 py-3">{ticket.status == 1 ? 'بسته' : 'باز' }</td>
                                <td>
                                    <Link href={`${pathname}/show/${ticket.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  نمایش     </Link>

                                    <Button type="button" onClick={() => {
                                         handlerChange(ticket.id)
                                    }} className={`py-2 px-4   ${ticket.status == 1 ? ' bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600' }  rounded text-white`}>  { ticket.status == 1 ?     'باز کردن' : 'بستن'   }  </Button> 
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