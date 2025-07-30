'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useDeletePermissionMutation, useGetAllPermissionQuery } from "@/lib/user/permissionApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllPermissionQuery({ page, perPage, search });
    const permissions = query?.data;
    const [deletePermission, result] =  useDeletePermissionMutation();

    useEffect(() => {
       useToast({result:result , message:'دسترسی'})
    }, [result]);
    

    return (<>
        <TableHeader 
         title={'   دسترسی  ها'}
         href={`${pathname}/create`}
         sitemap={'بخش  کاربران/ سطوح دسترسی/   دسترسی ها'}
        />
        

        <TableContainer
            pagination={permissions?.meta}
            deleteRecord={deletePermission}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام دسترسی </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {permissions.data?.map((permission) => {
      
                return (
                    <tr key={permission.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{permission.id}</td>
                        <td className="pl-3 py-3">{permission.name}</td>         
                        <td className="pl-3 py-3">{permission.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>    
                        <td>
                            <Link href={`${pathname}/edit/${permission.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([permission.name, permission.id]))
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