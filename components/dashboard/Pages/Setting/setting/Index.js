'use client'
import { CustomTable, SettingRecord, ShowImage} from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useGetAllSettingQuery } from "@/lib/setting/settingApi";
const Index = () => {
 
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query =   useGetAllSettingQuery({ page, perPage, search });
    const settings = query?.data;
    
    const  columns =[
        {key:'title', label:'عنوان'},
        {key:'logo' , label:'لوگو' , render:(value)=><ShowImage image={value} />}, 
        {key:'icon' , label:'آیکون' , render:(value)=><ShowImage image={value} />}, 
        {key:'keywords' ,label:'کلمات کلیدی' } , 
        {key:'description' ,label:'توضیحات' ,render:(value)=>value.replace(/<(.|\n)*?>/g, '').slice(0, 10) },
        {key:'setting' , label:'تنظیمات', render:(_,row)=><SettingRecord id={row.id} />}
      ]

    return (
     <CustomTable 
        title={'تنظیمات'}
        sitemap={'  تنظیمات'}
        pagination={settings?.meta}
        data={query}
        columns={columns} />
    )
}
export default Index;