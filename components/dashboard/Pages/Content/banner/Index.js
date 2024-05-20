'use client'
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useChangeBannerStatusMutation, useDeleteBannerMutation, useGetAllBannerQuery } from "@/lib/content/bannerApi";
import { toast } from "react-toastify";
import Link from "next/link";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: banners = [], isError, isLoading, isSuccess } = useGetAllBannerQuery({ page, perPage, search });

    const [changeStatus, { data: dataStatus }] = useChangeBannerStatusMutation();

    const [deleteBanner, result] = useDeleteBannerMutation();

    const handlerStatus = async (id) => {
        await changeStatus(id);
    }
    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(banners.data?.length));


    }, [isLoading, isSuccess, isError, banners])


    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success(' بنر با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }

    }, [result]);

    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === true && dataStatus.checked === true) {
                toast.success('    بنر  با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('    بنر با موفقیت غیر فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataStatus])




    return (<>
        <TitlePage
            name='  بنر ها  '
            sitemapPage='  بخش محتوایی / بنر ها   '
        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد بنر جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={banners?.meta}
            deleteRecord={deleteBanner}
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
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
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