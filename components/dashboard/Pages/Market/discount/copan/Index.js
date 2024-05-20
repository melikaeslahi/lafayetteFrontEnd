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
import Link from "next/link";
import { useDeleteCopanMutation, useGetAllCopanQuery } from "@/lib/market/copanApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  copans = [], isError, isLoading, isSuccess } =  useGetAllCopanQuery({ page, perPage, search });

  

    const [deleteCopan, result] =  useDeleteCopanMutation();

  

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(copans.data?.length));

    }, [isLoading, isSuccess, isError, copans])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('دسته بندی محصولات با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

 

 

    return (<>
        <TitlePage
            name='کپن تخفیف'
            sitemapPage='بخش فروش/ویترین/    تخفیف ها / کپن تخفیف'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  تخفیف جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={copans?.meta}
            deleteRecord={deleteCopan}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   کد کپن  </th>
                        <th className="pl-3 py-3">   نوع تخفیف   </th>
                        <th className="pl-3 py-3">      تخفیف برای     </th>
                        <th className="pl-3 py-3">   میزان تخفیف </th>
                        <th className="pl-3 py-3">    حداکثر تخفیف   </th>
                        <th className="pl-3 py-3">    تاریخ شروع </th>
                        <th className="pl-3 py-3">     تاریخ پایان </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {copans.data?.map((copan, index) => {
                
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{copan.code}</td>
                        <td className="pl-3 py-3">{copan.amount_type === 0 ? 'درصدی' : 'عددی' }</td>
                        <td className="pl-3 py-3">{copan.type === 0 ? 'همه' :  copan.user.first_name + copan.user.last_name }</td>
                        <td className="pl-3 py-3">{ copan.amount_type ===0 ? copan.amount + '%'  : copan.amount + 'تومان' }</td>

                        <td className="pl-3 py-3">{copan.discount_ceiling}</td>
                        <td className="pl-3 py-3">{copan.start_date}</td>
                        <td className="pl-3 py-3">{copan.end_date}</td>
                        <td>
                            <Link href={`${pathname}/edit/${copan.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([copan.code, copan.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
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