'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import Link from "next/link";
import { useGetAllSettingQuery } from "@/lib/setting/settingApi";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =   useGetAllSettingQuery({ page, perPage, search });
    const settings = query?.data;


    return (<>
        <TableHeader 
         title={'تنظیمات'}
         sitemap={'  تنظیمات'}
         href={`${pathname}/create`}
        />
       
        <TableContainer
            pagination={settings?.meta}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">     عنوان </th>
                        <th className="pl-3 py-3">     لوگو   </th>
                        <th className="pl-3 py-3">   آیکون   </th>
                        <th className="pl-3 py-3">     کلمات کلیدی</th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {settings.data?.map((setting) => {
                return (
                    <tr key={setting.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{setting.id}</td>
                        <td className="pl-3 py-3">{setting.title}</td>
                        <td className="pl-3 py-3"   >  
                            <Image   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${setting.logo}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        </td>
                         <td className="pl-3 py-3"   > 
                              <Image   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${setting.icon}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
   </td>
                        <td className="pl-3 py-3">{setting.keywords}</td>
                       
                        <td className="pl-3 py-3">{setting.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        
                        <td>
                            <Link href={`${pathname}/edit/${setting.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                             
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