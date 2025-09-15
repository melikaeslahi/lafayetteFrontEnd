'use client'
import { CustomTable, ShowImage } from "@/components/dashboard/Table";
import { usePathname  } from "next/navigation";
import { faEdit  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useGetAllProductQuery } from "@/services/market/storeApi";
 
const Index = () => {   
    const pathname = usePathname();

    const  columns =[
        {key:'name', label:'نام محصول'},
        {key:'image' , label:'تصویر' , render:(value)=><ShowImage image={value} />}, 
        {key:'marketable_number' ,label:'تعداد قابل فروش'  } , 
        {key:'sold_number' ,label:'تعداد فروخته شده'   },
        {key:'frozen_number' ,label:'تعداد رزرو شده'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><>
          <Link href={`${pathname}/create/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   ایجاد      </Link>
          <Link href={`${pathname}/edit/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
        </>}
      ]

    return ( 
      <CustomTable
         title={'دسته بندی ها'}
         sitemap={'بخش فروش/ویترین/دسته بندی ها'}
         query={useGetAllProductQuery}
         columns={columns} /> 
    )
}
export default Index;