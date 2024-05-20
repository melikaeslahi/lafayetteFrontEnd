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
import Image from "next/image";
import { toast } from "react-toastify";
import { useChangePostCategoryStatusMutation, useDeletePostCategoryMutation, useGetAllPostCategoryQuery } from "@/lib/content/postCategoryApi";
import Link from "next/link";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: postCategories = [], isError, isLoading, isSuccess } = useGetAllPostCategoryQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] = useChangePostCategoryStatusMutation();
    const [deleteCategory, result] = useDeletePostCategoryMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(postCategories.data?.length));

    }, [isLoading, isSuccess, isError, postCategories])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('دسته بندی با موفقیت حذف شد.', {
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
                toast.success('  دسته بندی  با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('  دسته بندی با موفقیت غیر فعال شد  ', {
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
            name='دسته بندی ها'
            sitemapPage=' بخش محتوایی / دسته بندی ها  '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد دسته جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={postCategories?.meta}
            deleteRecord={deleteCategory}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام دسته </th>
                        <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3">       برچسب ها    </th>
                        <th className="pl-3 py-3">  دسته والد </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {postCategories.data?.map((itemCategory, index) => {
                        const indexArray = Object.entries(itemCategory.image.indexArray);
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{itemCategory.name}</td>
                                <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                                    itemCategory.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                                ))}   </td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={itemCategory.status === 1 ? true : false} onChange={() => handlerStatus(itemCategory.id)} />}
                                </td>
                                <td className="pl-3 py-3">{itemCategory.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">{itemCategory.tags}</td>
                                <td className="pl-3 py-3">{itemCategory.parent !== null ? itemCategory.parent.name : 'دسته اصلی'}</td>
                                <td className="pl-3 py-3">{itemCategory.slug}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${itemCategory.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([itemCategory.name, itemCategory.id]))
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