'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname  } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useChangeActivationMutation, useChangeAdminStatusMutation, useDeleteAdminMutation, useGetAllAdminQuery } from "@/lib/user/adminUserApi";
const Index = () => {
    
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: admins = [], isError, isLoading, isSuccess } = useGetAllAdminQuery({ page, perPage, search });

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

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(admins.data?.length));

    }, [isLoading, isSuccess, isError, admins])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('  ادمین با موفقیت حذف شد.', {
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
                toast.success('     ادمین با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('  ادمین با موفقیت غیر فعال شد  ', {
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

    useEffect(() => {
        // status checked and unchecked
        if (dataActivation) {

            if (dataActivation.status === true && dataActivation.checked === true) {
                toast.success('            ادمین با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataActivation.status === true && dataActivation.checked === false) {

                toast.success(' ادمین با موفقیت غیر فعال شد ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataActivation.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataActivation])

    return (<>
        <TitlePage
            name=' کاربران ادمین'
            sitemapPage='بخش  کاربران / کاربران ادمین '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  ادمین جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={admins?.meta}
            deleteRecord={deleteAdmin}
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
                    {admins.data?.map((admin, index) => {
                        // const indexArray = Object.entries(admin.profile_photo_path?.indexArray);
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index += 1}</td>
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