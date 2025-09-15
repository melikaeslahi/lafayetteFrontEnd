'use client'
import { SettingRecord , ShowImage , CustomTable ,StatusRecord } from "@/components/dashboard/Table";
import { useChangeBannerStatusMutation, useDeleteBannerMutation, useGetAllBannerQuery } from "@/services/content/bannerApi";
 
 
const Index = () => {
    const  columns =[
        {key:'title', label:'عنوان بنر'},
        {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'بنر'} query={useChangeBannerStatusMutation} status={row.status} id={row.id}/> } , 
        {key:'positions' ,label:'موقعیت' ,render:(_,row)=>row.positions.map((position, index) => (
            row.position === index ? position : null))},
        {key:'url',label:'لینک'},
        {key:'setting',label:'تنظیمات', render:(_,row)=><SettingRecord message={'بنر'} query={useDeleteBannerMutation} id={row.id} title={row.title} />}
      ]
 
    return (         
            <CustomTable
             title={'بنر ها'}
             sitemap={'بخش محتوایی / بنر ها'}
             query={useGetAllBannerQuery}
             columns={columns} />  
    )
}
export default Index;