'use client'
import { CustomTable, SettingRecord, StatusRecord, TableHeader,TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChangeSliderStatusMutation, useDeleteSliderMutation, useGetAllSliderQuery } from "@/lib/content/sliderApi";
import useToast from "@/hooks/useToast";

const headers =['نام اسلایدر' ,'وضعیت' , 'دسته والد']

const Index = () => {
    
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query = useGetAllSliderQuery({ page, perPage, search });
    const sliders = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangeSliderStatusMutation();
    const [deleteSlider, {result:deleteResult}] =  useDeleteSliderMutation();

    useEffect(() => {
        useToast({result:deleteResult , message:'اسلایدر'})
    }, [deleteResult]);

    useEffect(() => {
     useToast({dataStatus:dataStatus , message:'اسلایدر'})    
    }, [dataStatus])

    return (<>
        <TableHeader 
          title={'اسلایدر'}
          href={`${pathname}/create`}
          sitemap={'بخش محتوایی /اسلایدرها'}
        />
         
        <TableContainer
            pagination={sliders?.meta}
            deleteRecord={deleteSlider}
            query={query}
        >
            {<CustomTable headers={headers}>
                {sliders.data?.map(( slider ) => {
                   return (
                      <tr key={slider.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                         <td className="pl-3 py-3">{slider.id}</td>
                         <td className="pl-3 py-3">{slider.name}</td>        
                         <td className="pl-3 py-3">
                           <StatusRecord id={slider.id} status={slider.status} changeStatus={changeStatus}/>
                         </td>
                         <td className="pl-3 py-3">{slider.parent !== null ? slider.parent?.name : 'دسته اصلی'}</td>
                         <td><SettingRecord id={slider.id} title={slider.name}/></td>
                      </tr>)
                    })} 
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;