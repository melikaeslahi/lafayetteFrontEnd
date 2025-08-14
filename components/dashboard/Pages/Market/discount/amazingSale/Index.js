'use client'
import { CustomTable, SettingRecord} from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react"; 
import { useDeleteAmazingSaleMutation, useGetAllAmazingSaleQuery } from "@/lib/market/amazingSaleApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);
    const query =  useGetAllAmazingSaleQuery({ page, perPage, search });
    const amazingSales =query?.data;
    const [deleteAmazingSale, {result:deleteResult}] =  useDeleteAmazingSaleMutation();
    
    const  columns =[
        {key:'product', label:'نام محصول',ender:(_ , row)=>row.product.name },
        {key:'percentage' , label:'درصد تخفیف'}, 
        {key:'start_date' ,label:'ناریخ شروع' } , 
        {key:'end_date' ,label:'تاریخ پایان'   },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.product.name} />}
      ]
     
    useEffect(() => {
         useToast({result:deleteResult , message:'تخفیف شگفت انگیز'})
    }, [deleteResult]);

    return (
      <CustomTable 
        title={' فروش فوق العاده'}
        sitemap={'بخش فروش/ویترین/ تخفیف ها / فروش فوقالعاده'}
        pagination={amazingSales?.meta} 
        deleteRecord={deleteAmazingSale}
        data={query}
        columns={columns} /> 
    )
}
export default Index;