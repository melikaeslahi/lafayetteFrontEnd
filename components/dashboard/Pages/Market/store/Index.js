'use client'
import { CustomTable, ShowImage } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { usePathname  } from "next/navigation";
import { faEdit  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useGetAllProductQuery } from "@/lib/market/storeApi";
 
const Index = () => {   
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllProductQuery({ page, perPage, search });
    const products = query?.data;

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
         pagination={products?.meta}
         data={query}
         columns={columns} /> 
    )
}
export default Index;