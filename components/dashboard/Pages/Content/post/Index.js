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
import { toast } from "react-toastify";
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useChangePostCommentableMutation, useChangePostStatusMutation, useDeletePostMutation, useGetAllPostQuery } from "@/lib/content/postApi";
import Link from "next/link";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: posts = [], isError, isLoading, isSuccess } =   useGetAllPostQuery({ page, perPage, search });

    const [changeStatus, { data: dataStatus }] =  useChangePostStatusMutation();
    const [changeCommentable, { data: dataCommentable }] =  useChangePostCommentableMutation();
    const [deletePost, result] =  useDeletePostMutation();

    const handlerStatus = async (id) => {
        await changeStatus(id);
    }

    const handlerCommentable = async (id) => {
        await changeCommentable(id);
    }

    useEffect(()=>{
        
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(posts.data?.length));
  

} , [isLoading , isSuccess , isError , posts])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success('   پست با موفقیت حذف شد.', {
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
                toast.success('    پست  با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('   پست با موفقیت غیر فعال شد  ', {
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

    useEffect(() => {
        //  commentable checked and unchecked
        if (dataCommentable) {

            if (dataCommentable.status === true && dataCommentable.checked === true) {
                toast.success('      کامنت پست  با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataCommentable.status === true && dataCommentable.checked === false) {

                toast.success(' کامنت پست   با موفقیت غیر فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataCommentable.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataCommentable])


    return (<>
        <TitlePage
            name='   پست ها  '
            sitemapPage='بخش محتوایی  / پست ها '

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  پست جدید
            </Link>
        </TitlePage>

        <TableContainer

            pagination={posts?.meta}
            deleteRecord={deletePost}


        >
            {<Table  > 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                     <th  className="pl-3 py-3"> # </th>
                     <th  className="pl-3 py-3"> عنوان پست </th>
                     <th  className="pl-3 py-3">    تصویر   </th>
                     <th  className="pl-3 py-3">  وضعیت   </th>
                     <th  className="pl-3 py-3"> متن </th>
                     <th  className="pl-3 py-3">    برچسب ها    </th>
                     <th  className="pl-3 py-3"> دسته بندی </th>
                     <th  className="pl-3 py-3">   اسلاگ </th>
                     <th  className="pl-3 py-3">   امکان درج کامنت </th>
                     <th  className="pl-3 py-3">   خلاصه  </th>
                     <th  className="pl-3 py-3">    تاریخ انتشار  </th>
                     <th  className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {posts.data?.map((post, index) => {
                const indexArray = Object.entries(post.image.indexArray);
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{post.title}</td>
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            post.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={post.status === 1 ? true : false} onChange={() => handlerStatus(post.id)} />}
                        </td>
                        <td className="pl-3 py-3">{post.body?.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{post.tags}</td>
                        <td className="pl-3 py-3">{post.category !== null ? post.category?.name : 'دسته اصلی'}</td>
                        <td className="pl-3 py-3">{post.slug}</td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="commentable" defaultChecked={post.commentable == 1 ? true : false} onChange={() => handlerCommentable(post.id)} />}
                        </td>
                        <td className="pl-3 py-3">{post.summary?.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{post.published_at}</td>
                        <td>
                            <Link href={`${pathname}/edit/${post.id}`}   className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />  </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([post.title, post.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                        </td>
                    </tr>)
            })} 
             </tbody></Table>  }
        </TableContainer>
    </>
    )
}
export default Index;