'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useChangeCustomerActivationMutation, useDeleteCustomerMutation, useGetAllCustomerQuery } from "@/lib/user/customerApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
 
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
 
    const  query =  useGetAllCustomerQuery({ page, perPage, search });
    const customers = query?.data;
    const [chengeActivation, { data: dataActivation }] =   useChangeCustomerActivationMutation();
 
    const [deleteCustomer, result] =  useDeleteCustomerMutation();

    const handlerActivation = async (id) => {
        await chengeActivation(id);
    }

    useEffect(() => {
         useToast({result:result , message:'مشتری'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataActivation , message:'مشتری'})
    }, [dataActivation])


    return (<>   
        <TableHeader 
          title={'مشترین'}
          sitemap={'بخش  کاربران / مشتریان '}
          href={`${pathname}/create`}
        />
       
        <TableContainer
            pagination={customers?.meta}
            deleteRecord={deleteCustomer}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">   نام ونام خانوادگی   </th>
                        {/* <th className="pl-3 py-3">       تصویر  </th> */}
                        <th className="pl-3 py-3">      ایمیل  </th>
                        <th className="pl-3 py-3">   موبایل   </th>             
                        <th className="pl-3 py-3">      وضعیت فعالیت     </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {customers.data?.map((customer) => {
                // const indexArray = Object.entries(customer.image.indexArray);
                return (
                    <tr key={customer.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{customer.id}</td>
                        <td className="pl-3 py-3">{customer.first_name + ' ' + customer.last_name}</td>
                        {/* <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            customer.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td> */}
                        <td className="pl-3 py-3">{customer.email}</td>
                        <td className="pl-3 py-3">{customer.mobile}</td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="activation" defaultChecked={customer.status === 1 ? true : false} onChange={() => handlerActivation(customer.id)} />}
                        </td>           
                        <td>
                            <Link href={`${pathname}/edit/${customer.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([customer.name, customer.id]))
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