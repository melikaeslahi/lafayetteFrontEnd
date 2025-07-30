'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname  } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useChangeActivationMutation, useChangeAdminStatusMutation, useDeleteAdminMutation, useGetAllAdminQuery } from "@/lib/user/adminUserApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllAdminQuery({ page, perPage, search });
    const admins = query?.data; 

    const [chengeStatus, { data: dataStatus }] = useChangeAdminStatusMutation();
    const [chengeActivation, { data: dataActivation }] = useChangeActivationMutation();

    const [deleteAdmin, result] = useDeleteAdminMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    const handlerActivation = async (id) => {
        await chengeActivation(id);
    }
     
    useEffect(() => {
        useToast({result:result , message:'ادمین'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:'ادمین'})
    }, [dataStatus])

    useEffect(() => {
         useToast({dataStatus:dataActivation , message:'ادمین'})
    }, [dataActivation])

    return (<>
        <TableHeader 
          title={' کاربران ادمین'}
          sitemap={'بخش  کاربران / کاربران ادمین '}
          href={`${pathname}/create`}
        />
         
        <TableContainer
            pagination={admins?.meta}
            deleteRecord={deleteAdmin}
            query={query}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   نام ونام خانوادگی   </th>
                        {/* <th className="pl-3 py-3"> تصویر  </th> */}
                        <th className="pl-3 py-3">      ایمیل  </th>
                        <th className="pl-3 py-3">   موبایل   </th>
                        <th className="pl-3 py-3">     نقش </th>
                        <th className="pl-3 py-3"> سطوح دسترسی </th>
                        <th className="pl-3 py-3">      وضعیت       </th>
                        <th className="pl-3 py-3">      وضعیت فعالیت     </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {admins.data?.map((admin) => {
                        // const indexArray = Object.entries(admin.profile_photo_path?.indexArray);
                        return (
                            <tr key={admin.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{admin.id}</td>
                                <td className="pl-3 py-3">{admin.first_name + ' ' + admin.last_name}</td>
                                {/* <td className="pl-3 py-3"   > {indexArray?.map(([size, value]) => (
                                    admin.profile_photo_path.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                                ))}   </td> */}
                                <td className="pl-3 py-3">{admin.email}</td>
                                <td className="pl-3 py-3">{admin.mobile}</td>
                                <td className="pl-3 py-3">{admin.roles ? admin.roles.map(( role, index) => (
                                    <p key={index}>{role.name}</p>
                                )) : 'نقشی وجود ندارد'}</td>
                                <td className="pl-3 py-3">{admin.permissions ? admin.permissions.map((permission, index) => (
                                    <p key={index}> {permission.name}</p>
                                )) : ' دسترسی  وجود ندارد'}</td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={admin.status === 1 ? true : false} onChange={() => handlerStatus(admin.id)} />}
                                </td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="activation" defaultChecked={admin.activation == 1 ? true : false} onChange={() => handlerActivation(admin.id)} />}
                                </td>

                                <td> 
                                    <Link href={`${pathname}/roles/${admin.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    نقش   </Link>
                                    <Link href={`${pathname}/permissions/${admin.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    دسترسی    </Link>
                                    <Link href={`${pathname}/edit/${admin.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([admin.name, admin.id]))
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