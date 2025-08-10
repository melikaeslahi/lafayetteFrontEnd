'use client'
import { SettingRecord, CustomTable, TableContainer , TableHeader } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname} from "next/navigation";
import { useDeleteDeliveryMutation, useGetAllDeliveryQuery } from "@/lib/market/deliveryApi";
import useToast from "@/hooks/useToast";

const headers=['نام  روش' , 'هزینه' , 'زمان ارسال' ,'واحد زمان ارسال ']

const Index = () => {
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
            {<CustomTable headers={headers}>   
              {deliveries.data?.map((delivery) => {
                return (
                  <tr key={delivery.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                    <td className="pl-3 py-3">{delivery.id}</td>
                    <td className="pl-3 py-3">{delivery.name}</td>
                    <td className="pl-3 py-3">{delivery.amount}</td>
                    <td className="pl-3 py-3">{delivery.delivery_time}</td>
                    <td className="pl-3 py-3">{delivery.delivery_time_unit}</td>
                    <td>
                        <SettingRecord id={delivery.id} title={delivery.name} />
                    </td>
                    </tr>)
            }) }    
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;