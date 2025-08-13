'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useChangeSliderStatusMutation, useDeleteSliderMutation, useGetAllSliderQuery } from "@/lib/content/sliderApi";
import useToast from "@/hooks/useToast";

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util);

    const query = useGetAllSliderQuery({ page, perPage, search });
    const sliders = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangeSliderStatusMutation();
    const [deleteSlider, {result:deleteResult}] =  useDeleteSliderMutation();
    
    const  columns =[
      {key:'name', label:'نام اسلایدر'},
      {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
      {key:'parent' ,label:'دسته والد', render:(_ , row)=>row.parent !== null ? row.parent.name : 'دسته اصلی'},
      {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} title={row.name} />}
    ]
    useEffect(() => {
        useToast({result:deleteResult , message:'اسلایدر'})
    }, [deleteResult]);

    useEffect(() => {
     useToast({dataStatus:dataStatus , message:'اسلایدر'})    
    }, [dataStatus])

    return (
        <CustomTable 
          title={'اسلایدر'}
          sitemap={'بخش محتوایی /اسلایدرها'}
          pagination={sliders?.meta}
          deleteRecord={deleteSlider}
          data={query}
          columns={columns} />
    )
}
export default Index;