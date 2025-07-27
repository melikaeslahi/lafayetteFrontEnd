'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname} from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import Link from "next/link";
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from "@/lib/market/deliveryApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllDeliveryQuery({ page, perPage, search });
    const deliveries =query?.data;
    const [deleteDelivery, {result:deleteResult}] =  useDeleteDeliveryMutation();

    useEffect(() => {
        useToast({result:deleteResult , message:'روش ارسال'})
    }, [deleteResult]);

    return (<>
        <TableHeader 
         title={'روش های ارسال'}
         href={`${pathname}/create`}
         sitemap={'بخش فروش/ویترین/ روش های ارسال'}
        />

        <TableContainer
            pagination={deliveries?.meta}
            deleteRecord={deleteDelivery}
            query={query}
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
            {deliveries.data?.map((delivery) => {
                return (
                    <tr key={delivery.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{delivery.id}</td>
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