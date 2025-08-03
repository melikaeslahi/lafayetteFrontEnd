'use client'
import { CustomTable, SettingRecord, StatusRecord, TableContainer ,TableHeader } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChangeFaqStatusMutation, useDeleteFaqMutation, useGetAllFaqsQuery } from "@/lib/content/faqApi";
import useToast from "@/hooks/useToast";

const headers = ['سوال' , 'پاسخ' ,'وضعیت' ,'برچسب ها' ,'اسلاگ']

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
 
    const  query = useGetAllFaqsQuery({ page, perPage, search });
    const faqs = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangeFaqStatusMutation();
    const [deleteFaq, {result:deleteResult}] =  useDeleteFaqMutation();
    
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
        sitemap={' بخش محتوایی / سوالات متداول'}
        />
        
        <TableContainer
            pagination={faqs?.meta}
            deleteRecord={deleteFaq}
            query={query}
        >
            {<CustomTable headers={headers}>
                {faqs.data?.map((faq) => {
                    return (
                     <tr key={faq.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                            <td className="pl-3 py-3">{faq.id}</td>
                            <td className="pl-3 py-3">{faq.question.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                            <td className="pl-3 py-3">{faq.answer.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                            <td className="pl-3 py-3">
                                <StatusRecord id={faq.id}
                                 status={faq.status}
                                 changeStatus={changeStatus} />
                            </td>
                            <td className="pl-3 py-3">{faq.tag}</td>           
                            <td className="pl-3 py-3">{faq.slug}</td>
                            <td>
                                <SettingRecord id={faq.id} title={faq.name}/>
                            </td>
                     </tr>)
                    })}
                     </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;