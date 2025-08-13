'use client'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SettingRecord , ShowImage , CustomTable ,StatusRecord } from "@/components/dashboard/Table";
import { useChangeBannerStatusMutation, useDeleteBannerMutation, useGetAllBannerQuery } from "@/lib/content/bannerApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util); 
    const query = useGetAllBannerQuery({ page, perPage, search });
    const banners = query?.data;

    const [changeStatus, {data: dataStatus }] = useChangeBannerStatusMutation();
    const [deleteBanner, {result:deleteResult}] = useDeleteBannerMutation();

    const  columns =[
        {key:'title', label:'عنوان بنر'},
        {key:'image' , label:'تصویر' , render:(_ , row)=><ShowImage image={row.image} />}, 
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'positions' ,label:'موقعیت' ,render:(_,row)=>row.positions.map((position, index) => (
            row.position === index ? position : null))},
        {key:'url',label:'لینک'},
        {key:'setting',label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.title} />}
      ]

    useEffect(()=>{
        useToast({dataStatus:dataStatus , message:"بنر"})
    } ,[dataStatus])

    useEffect(()=>{
        useToast({result:deleteResult , message:"بنر"})
    } ,[result])

    return (         
            <CustomTable
             title={'بنر ها'}
             sitemap={'بخش محتوایی / بنر ها'}
             pagination={banners?.meta}
             deleteRecord={deleteBanner}
             data={query}
             columns={columns} />  
    )
}
export default Index;