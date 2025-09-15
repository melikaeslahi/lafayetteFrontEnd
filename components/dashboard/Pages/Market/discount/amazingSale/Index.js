'use client'
import { CustomTable, SettingRecord} from "@/components/dashboard/Table";
import { useDeleteAmazingSaleMutation, useGetAllAmazingSaleQuery } from "@/services/market/amazingSaleApi";

const Index = () => {
    const  columns =[
        {key:'product', label:'نام محصول',ender:(_ , row)=>row.product.name },
        {key:'percentage' , label:'درصد تخفیف'}, 
        {key:'start_date' ,label:'ناریخ شروع' } , 
        {key:'end_date' ,label:'تاریخ پایان'   },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'تخفیف شگفت انگیز'} query={useDeleteAmazingSaleMutation} id={row.id} title={row.product.name} />}
      ]
    
    return (
      <CustomTable 
        title={' فروش فوق العاده'}
        sitemap={'بخش فروش/ویترین/ تخفیف ها / فروش فوقالعاده'}
        query={useGetAllAmazingSaleQuery}
        columns={columns} /> 
    )
}
export default Index;