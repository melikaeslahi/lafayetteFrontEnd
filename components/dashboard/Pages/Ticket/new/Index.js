'use client'
import { CustomTable } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useChangeMutation,  useGetNewTicketsQuery } from "@/lib/ticket/ticketApi";
import useToast from "@/hooks/useToast";
 
 
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =   useGetNewTicketsQuery({ page, perPage, search });
    const tickets = query?.data;
    const [chenge, { data: dataStatus }] =  useChangeMutation();
     
    const  columns =[
        {key:'user', label:'نویسنده تیکت' ,render:(value)=>`${value.first_name} ${value.last_name}`},
        {key:'subject' , label:'عنوان تیکت ' }, 
        {key:'category' ,label:'دسته تیکت' ,render:(value)=>value.name },
        {key:'priority' ,label:'اولویت',render:(value)=>value.name},
        {key:'admin' ,label:'ارجاع شده از', render:(value)=>value ? `${value.admin.first_name } ${value.admin.last_name }`: 'نامشخص' },
        {key:'parent',label:'تیکت مرجع' , render:(value)=> value?.subject ?? '_'},
        {key:'status' ,label:'وضعیت', render:(value)=> value == 1 ? 'بسته' : 'باز' } , 
        {key:'setting' , label:'تنظیمات', render:(_,row)=>
        <>
         <Link href={`${pathname}/show/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  نمایش     </Link>
         <Button type="button" onClick={() => {
          handlerChange(row.id)}} 
          className={`py-2 px-4 rounded text-white
          ${row.status == 1 ? 
          ' bg-red-500 hover:bg-red-600' : 
          'bg-green-500 hover:bg-green-600' }  `}>  
          {row.status == 1 ?'باز کردن' : 'بستن'} 
          </Button>         
        </>
        }
      ]

    const handlerChange = async (id) => {
        await chenge(id);
    }

    useEffect(() => { 
         let message;
            if (dataStatus?.status === true && dataStatus?.checked === true) {
                message = ' تیکت با موفقیت باز شد  ' 
            } else if (dataStatus?.status === true && dataStatus?.checked === false) {
                message =  ' با موفقیت    بسته  شد  ' 
            } else if (dataStatus?.status === false) {
                message = '   خطایی پیش آمده است  '    
            }
            useToast({dataStatus:dataStatus , customMessage:message})
    }, [dataStatus])

    return (
        <CustomTable 
          title={' تیکت ها '}
          sitemap={'بخش فروش/ویترین/   تیکت ها'}
          pagination={tickets?.meta}
          data={query}
          columns={columns} />          
    )
}
export default Index;