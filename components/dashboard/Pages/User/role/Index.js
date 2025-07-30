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
import { useDeleteRoleMutation, useGetAllRoleQuery } from "@/lib/user/roleApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
     
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query=  useGetAllRoleQuery({ page, perPage, search });
    const roles = query?.data;
    const [deleteRole, result] =  useDeleteRoleMutation();

    useEffect(() => {
        useToast({result:result , message:'نقش'})
    }, [result]);

    return (<>
       <TableHeader 
        title={' نقش ها ها'}
        sitemap={'بخش  کاربران/ سطوح دسترسی/   نقش ها'}
        href={`${pathname}/create`}
       />
       
        <TableContainer
            pagination={ roles?.meta}
            deleteRecord={deleteRole}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  نقش </th> 
                        <th className="pl-3 py-3">  توضیحات </th> 
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {roles.data?.map((role) => {
                return (
                    <tr key={role.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{role.id}</td>
                        <td className="pl-3 py-3">{role.name}</td>            
                        <td className="pl-3 py-3">{role.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>    
                        <td>
                            <Link href={`${pathname}/edit/${role.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([role.name, role.id]))
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