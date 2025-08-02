'use client'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TableContainer } from "@/components/dashboard/Table";
import { useChangeBannerStatusMutation, useDeleteBannerMutation, useGetAllBannerQuery } from "@/lib/content/bannerApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
import SettingRecord from "@/components/dashboard/Table/SettingRecord";
import ShowImage from "@/components/dashboard/Table/ShowImage";
import CustomTable from "@/components/dashboard/Table/CostumTable";
import StatusRecord from "@/components/dashboard/Table/StatusRecord";
 
const headers=['عنوان بنر ' , ' تصویر بنر ' ,'وضعیت بنر ' ,'موقعیت بنر ' ,'لینک ' ] 

const Index = () => {
    const { page, perPage, search } = useSelector((state) => state.util); 
    const query = useGetAllBannerQuery({ page, perPage, search });
    const banners = query?.data;

    const [changeStatus, {data: dataStatus }] = useChangeBannerStatusMutation();
    const [deleteBanner, {result:deleteResult}] = useDeleteBannerMutation();

    useEffect(()=>{
        useToast({dataStatus:dataStatus , message:"بنر"})
    } ,[dataStatus])

    useEffect(()=>{
        useToast({result:deleteResult , message:"بنر"})
    } ,[result])

    return (<>
    <TableHeader
      title={'بنر ها'}
      href={`${pathname}/create`}
      sitemap={'بخش محتوایی / بنر ها'}
    />
        <TableContainer
            pagination={banners?.meta}
            deleteRecord={deleteBanner}
            query={query}
        >         
            {<CustomTable headers={headers}>  
                {banners.data?.map((banner) => {
                    return (
                      <tr key={banner.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete w-full border-b-2 border-pallete">
                        <td className="pl-3 py-3">{banner.id}</td>
                        <td className="pl-3 py-3">{banner.title}</td>
                        <td className="pl-3 py-3"   > 
                        <ShowImage image={banner.image} />  </td>
                        <td className="pl-3 py-3">
                            <StatusRecord 
                              status={banner.status}
                              id={banner.id}
                              changeStatus={changeStatus}/>
                        </td>
                        <td className="pl-3 py-3">
                            {banner.positions.map((position, index) => (
                            banner.position === index ? position : null))}
                        </td>
                        <td className="pl-3 py-3">{banner.url}</td>
                        <td>
                             <SettingRecord 
                               id={banner.id}
                               title={banner.title} />
                        </td>
                    </tr>)
                    })} 
                     </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;