'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { useChangeFaqStatusMutation, useDeleteFaqMutation, useGetAllFaqsQuery } from "@/lib/content/faqApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {

    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/faq?page=1,2,3
    const { data: faqs = [], isError, isLoading, isSuccess } = useGetAllFaqsQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] =  useChangeFaqStatusMutation();
    const [deleteFaq, {result:deleteResult}] =  useDeleteFaqMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);

    useEffect(() => {
        dispatch(setIsSuccess(isSuccess));
    }, [isSuccess]);

    useEffect(() => {      
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect(() => {    
        dispatch(setItemLength(faqs.data?.length));
    }, [faqs]);

    useEffect(() => {
      useToast({result:deleteResult , message: 'سوال'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:'سوال'})
    }, [dataStatus])

    return (<>
        <TableHeader 
        title={'سوالات متداول'}
        href={`${pathname}/create`}
        sitemap={' بخش محتوایی / سوالات متداول  '}
        />
        <TableContainer
            pagination={faqs?.meta}
            deleteRecord={deleteFaq}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   سوال   </th>
                        <th className="pl-3 py-3">   پاسخ </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">       برچسب ها    </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.data?.map((faq, index) => {

                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{faq.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">{faq.answer.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>

                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={faq.status === 1 ? true : false} onChange={() => handlerStatus(faq.id)} />}
                                </td>
                                <td className="pl-3 py-3">{faq.tag}</td>           
                              <td className="pl-3 py-3">{faq.slug}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${faq.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([faq.name, faq.id]))
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