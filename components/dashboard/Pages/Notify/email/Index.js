'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useChangeEmailStatusMutation, useDeleteEmailMutation, useGetAllEmailQuery } from "@/lib/notify/EmailApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllEmailQuery({ page, perPage, search });
    const emails =query?.data;

    const [chengeStatus, { data: dataStatus }] =   useChangeEmailStatusMutation();
    const [deleteEmail, result] =  useDeleteEmailMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
       useToast({result:result , message:'ایمیل'});
    }, [result]);

    useEffect(() => {
      useToast({dataStatus:dataStatus , message:'ایمیل'});
    }, [dataStatus])

    return (<>
       <TableHeader 
        title={' ایمیل ها'}
        sitemap={' بخش  اطلاع رسانی / ایمیل ها  '}
        href={`${pathname}/create`}
       />
        <TableContainer
            pagination={emails?.meta}
            deleteRecord={deleteEmail}
            query={query}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   موضوع   </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3"> تاریخ انتشار    </th>                     
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    { emails.data?.map((email, index) => {
             
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{email.subject}</td>
                              
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={email.status === 1 ? true : false} onChange={() => handlerStatus(email.id)} />}
                                </td>
                                <td className="pl-3 py-3">{email.body?.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">{email.published_at}</td>
 
                                <td>
                                    <Link href={`${pathname}/edit/${email.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([email.subject,  email.id]))
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