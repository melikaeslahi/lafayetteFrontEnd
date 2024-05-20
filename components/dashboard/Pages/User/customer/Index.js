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
import { useChangeCustomerActivationMutation, useDeleteCustomerMutation, useGetAllCustomerQuery } from "@/lib/user/customerApi";
 
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  customers = [], isError, isLoading, isSuccess } =   useGetAllCustomerQuery({ page, perPage, search });

    const [chengeActivation, { data: dataActivation }] =   useChangeCustomerActivationMutation();
 

 

    const [deleteCustomer, result] =  useDeleteCustomerMutation();

 
    const handlerActivation = async (id) => {
        await chengeActivation(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(customers.data?.length));

    }, [isLoading, isSuccess, isError, customers])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('   مشتری با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

    useEffect(() => {
        // status checked and unchecked
        if (dataActivation) {

            if (dataActivation.status === true && dataActivation.checked === true) {
                toast.success('     مشتری با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataActivation.status === true && dataActivation.checked === false) {

                toast.success('       مشتری با موفقیت غیر فعال شد  ', {
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
            name='مشترین'
            sitemapPage='بخش  کاربران / مشتریان '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  مشتری جدید
            </Link>
        </TitlePage>

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
            {customers.data?.map((customer, index) => {
                // const indexArray = Object.entries(customer.image.indexArray);
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
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