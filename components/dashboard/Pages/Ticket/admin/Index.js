'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import {  faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
 
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useChangeTicketAdminStatusMutation, useGetAllTicketAdminQuery } from "@/lib/ticket/ticketAdminApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  admins = [], isError, isLoading, isSuccess } =  useGetAllTicketAdminQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] = useChangeTicketAdminStatusMutation();
     

    

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    
    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(admins.data?.length));

    }, [isLoading, isSuccess, isError, admins])

 

    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === 200) {
                toast.success('            تیکت ادمین تغییر کرد    ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
            //  else if (dataStatus.status === true && dataStatus.checked === false) {

            //     toast.success('  دسته بندی محصولات با موفقیت غیر فعال شد  ', {
            //         position: toast.POSITION.TOP_LEFT,
            //         rtl: true
            //     })
            // } else if (dataStatus.status === false) {
            //     toast.error('   خطایی پیش آمده است  ', {
            //         position: toast.POSITION.TOP_LEFT,
            //         rtl: true
            //     })
            // }
        }

    }, [dataStatus])

    

    return (<>
        <TitlePage
            name='  تیکت ادمین'
            sitemapPage='بخش  تیکت ها/  تیکت ادمین'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  تیکت ادمین جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={ admins?.meta}
         
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   نام ادمین </th>
                        <th className="pl-3 py-3">    ایمیل ادمین </th>
                    </tr>
                </thead>
                <tbody>
            { admins.data?.map(( admin, index) => {
 
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{admin.first_name + ' ' + admin.last_name } </td>
                        
                        
                        <td className="pl-3 py-3">{admin.email}</td>
                        
                        <td>
                          
                            <Button type="button" onClick={() => {
                               handlerStatus(admin.id)
                            }} className={`py-2 px-4 ${ admin.admin == null ? 'bg-green-500 hover:bg-green-600' :  `bg-red-500 hover:bg-red-600`} rounded text-white`}>  <FontAwesomeIcon icon={faTrash} />     </Button>
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