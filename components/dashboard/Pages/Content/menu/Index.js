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
import { useChangeMenuStatusMutation, useDeleteMenuMutation, useGetAllMenusQuery } from "@/lib/content/menuApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: menus = [], isError, isLoading, isSuccess } = useGetAllMenusQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] =   useChangeMenuStatusMutation();
    const [deleteMenu, result] =  useDeleteMenuMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(menus.data?.length));

    }, [isLoading, isSuccess, isError, menus])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success(' منو با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === true && dataStatus.checked === true) {
                toast.success(' منو  با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('منو با موفقیت غیر فعال شد ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataStatus])

    return (<>
        <TitlePage
            name='منو ها'
            sitemapPage=' بخش محتوایی /  منو ها  '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  منو جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={menus?.meta}
            deleteRecord={deleteMenu}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  منو </th>
                        <th className="pl-3 py-3">     آدرس   </th>
                        <th className="pl-3 py-3">   وضعیت </th>
                        <th className="pl-3 py-3">   منو والد   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {menus.data?.map((menu, index) => {
                        
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{menu.name}</td>
                                <td className="pl-3 py-3">{menu.url}</td>  
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={menu.status === 1 ? true : false} onChange={() => handlerStatus(menu.id)} />}
                                </td>       
                                <td className="pl-3 py-3">{menu.parent !== null ? menu.parent.name : ' منو اصلی'}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${menu.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([menu.name, menu.id]))
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