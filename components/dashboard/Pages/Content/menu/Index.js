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
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

     //fetch menus
    const { data: menus = [], isError, isLoading, isSuccess } = useGetAllMenusQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] =   useChangeMenuStatusMutation();
    const [deleteMenu, result] =  useDeleteMenuMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
        dispatch(setIsSuccess(isSuccess));
    }, [isSuccess]);

    useEffect(() => {
        dispatch(setIsError(isError));
    }, [isError]);

    useEffect(() => {
        dispatch(setItemLength(menus.data?.length));
    }, [menus]);

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);

    useEffect(() => {
       useToast({result:result , message:"منو"})
    }, [result]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:"منو"})

    }, [dataStatus])

    return (<>
    <TableHeader 
    title={'منو ها'}
    href={`${pathname}/create`}
    sitemap={'بخش محتوایی / منو ها'}
    />
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