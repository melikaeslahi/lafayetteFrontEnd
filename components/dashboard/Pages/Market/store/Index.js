'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { usePathname  } from "next/navigation";
import { faEdit  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import Link from "next/link";
import { useGetAllProductQuery } from "@/lib/market/storeApi";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {   
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query =  useGetAllProductQuery({ page, perPage, search });
    const products = query?.data;


    return (<>
    <TableHeader 
    title={'دسته بندی ها'}
    sitemap={'بخش فروش/ویترین/دسته بندی ها'}
    href={`${pathname}/create`}
    />
        <TableContainer
            pagination={products?.meta}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام محصول </th>
                        <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">   تعداد قابل فروش    </th>
                        <th className="pl-3 py-3">      تعداد فروخته شده     </th>
                        <th className="pl-3 py-3">   تعداد رزرو شده </th>               
                    </tr>
                </thead>
                <tbody>
            {products.data?.map((product) => {
                const indexArray = Object.entries(product.image.indexArray);
                return (
                    <tr key={product.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{product.id}</td>
                        <td className="pl-3 py-3">{product.name}</td>
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            product.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>                    
                        <td className="pl-3 py-3">{product.marketable_number}</td>
                        <td className="pl-3 py-3">{product.sold_number}</td>
                        <td className="pl-3 py-3">{product.frozen_number}</td>              
                        <td>
                        <Link href={`${pathname}/create/${product.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   ایجاد      </Link>
                            <Link href={`${pathname}/edit/${product.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                             
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