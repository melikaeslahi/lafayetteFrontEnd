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
import { useChangeSMSStatusMutation, useDeleteSMSMutation, useGetAllSMSQuery } from "@/lib/notify/SMSApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =  useGetAllSMSQuery({ page, perPage, search });
    const smses = query?.data;

    const [chengeStatus, { data: dataStatus }] =   useChangeSMSStatusMutation();
    const [deleteSMS, result] =  useDeleteSMSMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
        useToast({result: result , message:'پیام'})
    }, [result]);

    useEffect(() => {
       useToast({dataStatus:dataStatus , message:"پیام"})
    }, [dataStatus])

    return (<>
        <TableHeader 
          title={'پیام ها'}
          sitemap={' بخش  اطلاع رسانی / پیام ها  '}
          href={`${pathname}/create`}
        />
    
        <TableContainer
            pagination={smses?.meta}
            deleteRecord={deleteSMS}
            query={query}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  عنوان </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3"> تاریخ انتشار </th>       
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {smses.data?.map((sms) => { 
                        return (
                            <tr key={sms.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{sms.id}</td>
                                <td className="pl-3 py-3">{sms.title}</td>
                                
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={sms.status === 1 ? true : false} onChange={() => handlerStatus(sms.id)} />}
                                </td>
                                <td className="pl-3 py-3">{sms.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">{sms.published_at}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${sms.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([sms.title, sms.id]))
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