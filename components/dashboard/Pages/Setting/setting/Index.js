'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
import { useChangeProductCategoryStatusMutation, useChangeShowInMenuMutation, useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from "@/lib/market/productCategoryApi";
import Link from "next/link";
import { useGetAllSettingQuery } from "@/lib/setting/settingApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  settings = [], isError, isLoading, isSuccess } =   useGetAllSettingQuery({ page, perPage, search });

     

 

  

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(settings.data?.length));

    }, [isLoading, isSuccess, isError, settings])

    
     

    

    return (<>
        <TitlePage
            name='تنظیمات'
            sitemapPage='  تنظیمات'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  تنظیمات جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={settings?.meta}
    
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
            {settings.data?.map((setting, index) => {
             

                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
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