'use client'
import { CustomTable, SettingRecord } from "@/components/dashboard/Table";
import { useDeleteCopanMutation, useGetAllCopanQuery } from "@/services/market/copanApi";
 
const Index = () => {  
    const  columns =[
        {key:'code', label:'کد کپن'},
        {key:'amount_type' , label:'نوع تخفیف' , render:(_ , row)=>row.amount_type === 0 ? 'درصدی' : 'عددی'}, 
        {key:'type' ,label:'تخفیف برای', render:(_ , row)=> row.type === 0 ? 'همه' : `${ row.user.first_name}  ${row.user.last_name}` } , 
        {key:'amount_type' ,label:'میزان تخفیف' ,render:(_,row)=>row.description.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'discount_ceiling' ,label:'حداکثر تخیف' , render:(_,row)=>row.amount_type ===0 ? `${row.amount}'%'`  : `${row.amount} 'تومان'` },
        {key:'start_date' ,label:'تاریخ شروع', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
        {key:'end_date',label:'تاریخ پایان'},
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord message={'کپن تخفیف'} query={useDeleteCopanMutation} id={row.id} title={row.code} />}
      ]
    return (
          <CustomTable 
           title={'کپن تخفیف'}
           sitemap={'بخش فروش/ویترین/ تخفیف ها / کپن تخفیف'}
           query={useGetAllCopanQuery}
           columns={columns} />
    )
}
export default Index;