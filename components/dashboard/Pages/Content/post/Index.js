'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useChangePostCommentableMutation, useChangePostStatusMutation, useDeletePostMutation, useGetAllPostQuery } from "@/lib/content/postApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query = useGetAllPostQuery({ page, perPage, search });
    const posts = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangePostStatusMutation();
    const [changeCommentable, { data: dataCommentable }] =  useChangePostCommentableMutation();
    const [deletePost, {result:deleteResult}] =  useDeletePostMutation();

    const handlerStatus = async (id) => {
        await changeStatus(id);
    }

    const handlerCommentable = async (id) => {
        await changeCommentable(id);
    }

    
    useEffect(() => {
         useToast({result:deleteResult , message:'پست'})
    }, [deleteResult]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'پست'})
    }, [dataStatus])

    useEffect(() => {
         useToast({dataStatus:dataCommentable , message:'کامنت پست'})
    }, [dataCommentable])


    return (<>
        <TableHeader 
           title={'پست ها'}
           href={`${pathname}/create`}
           sitemap={'بخش محتوایی /پست ها'}
        />
        
        <TableContainer
            pagination={posts?.meta}
            deleteRecord={deletePost}
            query={query}
        >
            {<Table > 
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
            {posts.data?.map((post) => {
                const indexArray = Object.entries(post.image.indexArray);
                return (
                    <tr key={post.is} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{post.id}</td>
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