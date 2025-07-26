'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useChangeBannerStatusMutation, useDeleteBannerMutation, useGetAllBannerQuery } from "@/lib/content/bannerApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    
    const { page, perPage, search } = useSelector((state) => state.util); 
    const query = useGetAllBannerQuery({ page, perPage, search });
    const banners = query?.data;

    const [changeStatus, { data: dataStatus }] = useChangeBannerStatusMutation();

    const [deleteBanner, {result:deleteResult}] = useDeleteBannerMutation();

    const handlerStatus = async (id) => {
        await changeStatus(id);
    }
    
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
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                     <th  className="pl-3 py-3"> # </th>
                     <th  className="pl-3 py-3"> عنوان بنر </th>
                     <th  className="pl-3 py-3">    تصویر بنر </th>
                     <th  className="pl-3 py-3">  وضعیت بنر </th>
                     <th  className="pl-3 py-3">   موقعیت بنر </th>
                     <th  className="pl-3 py-3">    لینک   </th>
                     <th  className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {banners.data?.map((banner, index) => {
                        return (
                            <tr key={banner.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{banner.id}</td>
                                <td className="pl-3 py-3">{banner.title}</td>
                                <td className="pl-3 py-3"   >  
                                   <Image   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                           </td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={banner.status === 1 ? true : false} onChange={() => handlerStatus(banner.id)} />}
                                </td>

                                <td className="pl-3 py-3">{banner.positions.map((position, index) => (
                                    banner.position === index ? position : null
                                )

                                )}</td>
                                <td className="pl-3 py-3">{banner.url}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${banner.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([banner.title, banner.id]))
                                        dispatch(modalOpenClose(true));
                                    }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                                </td>
                            </tr>)
                    })}</tbody> </Table>}
        </TableContainer>
    </>
    )
}
export default Index;