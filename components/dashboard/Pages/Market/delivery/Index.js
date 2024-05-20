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
 
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from "@/lib/market/deliveryApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  deliveries = [], isError, isLoading, isSuccess } =  useGetAllDeliveryQuery({ page, perPage, search });

 

    const [deleteDelivery, result] =  useDeleteDeliveryMutation();

 

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(deliveries.data?.length));

    }, [isLoading, isSuccess, isError, deliveries])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('     روش ارسال با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

   
    return (<>
        <TitlePage
            name=' روش های  ارسال'
            sitemapPage='بخش فروش/ویترین/ روش های ارسال'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد دسته جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={deliveries?.meta}
            deleteRecord={deleteDelivery}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  روش </th>
                        <th className="pl-3 py-3">     هزینه   </th>
                        <th className="pl-3 py-3">   زمان ارسال   </th>
                        <th className="pl-3 py-3">        واحد زمان ارسال   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {deliveries.data?.map((delivery, index) => {
               
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{delivery.name}</td>
                        <td className="pl-3 py-3">{delivery.amount}</td>
                        <td className="pl-3 py-3">{delivery.delivery_time}</td>
                        <td className="pl-3 py-3">{delivery.delivery_time_unit}</td>
                        <td>
                            <Link href={`${pathname}/edit/${delivery.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([delivery.name, delivery.id]))
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