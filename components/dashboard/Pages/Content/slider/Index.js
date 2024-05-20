'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify";
import Link from "next/link";
import { useChangeSliderStatusMutation, useDeleteSliderMutation, useGetAllSliderQuery } from "@/lib/content/sliderApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  sliders = [], isError, isLoading, isSuccess } = useGetAllSliderQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] =  useChangeSliderStatusMutation();
    const [deleteSlider, result] =  useDeleteSliderMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(sliders.data?.length));

    }, [isLoading, isSuccess, isError,  sliders])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success(' اسلایدر   با موفقیت حذف شد.', {
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
                toast.success('   اسلایدر با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('     اسلایدر با موفقیت غیر فعال شد  ', {
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
            name='   اسلایدر ها'
            sitemapPage=' بخش محتوایی / اسلایدر   ها  '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  اسلایدر جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={sliders?.meta}
            deleteRecord={deleteSlider}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام اسلایدر </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">  دسته والد </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {sliders.data?.map(( slider, index) => {
                     
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{slider.name}</td>
                                
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={slider.status === 1 ? true : false} onChange={() => handlerStatus(slider.id)} />}
                                </td>
 
                                <td className="pl-3 py-3">{slider.parent !== null ? slider.parent?.name : 'دسته اصلی'}</td>
                                 
                                <td>
                                    <Link href={`${pathname}/edit/${slider.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Link href={`${pathname}/products/${slider.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   اضافه کردن محصول    </Link>

                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([slider.name, slider.id]))
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