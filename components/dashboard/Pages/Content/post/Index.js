'use client'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { CustomTable, SettingRecord, ShowImage, StatusRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import { useChangePostCommentableMutation, useChangePostStatusMutation, useDeletePostMutation, useGetAllPostQuery } from "@/lib/content/postApi";
import useToast from "@/hooks/useToast";

const headers =['عنوان پست' ,'تصویر' ,'وضعیت' ,'متن' ,'برچسب ها', 'دسته بندی' ,'اسلاگ' ,'امکان درج کامنت','خلاصه' ,'تاریخ انتشار']

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    const query = useGetAllPostQuery({ page, perPage, search });
    const posts = query?.data;

    const [changeStatus, { data: dataStatus }] =  useChangePostStatusMutation();
    const [changeCommentable, { data: dataCommentable }] =  useChangePostCommentableMutation();
    const [deletePost, {result:deleteResult}] =  useDeletePostMutation();


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
         {<CustomTable headers={headers} > 
            {posts.data?.map((post) => {
              return (
                <tr key={post.is} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                    <td className="pl-3 py-3">{post.id}</td>
                       <td className="pl-3 py-3">{post.title}</td>
                    <td className="pl-3 py-3"> <ShowImage image={post.image}/></td>
                    <td className="pl-3 py-3">
                      <StatusRecord id={post.id} status={post.staus} changeStatus={changeStatus} />
                    </td>
                    <td className="pl-3 py-3">{post.body?.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                    <td className="pl-3 py-3">{post.tags}</td>
                    <td className="pl-3 py-3">{post.category !== null ? post.category?.name : 'دسته اصلی'}</td>
                    <td className="pl-3 py-3">{post.slug}</td>
                    <td className="pl-3 py-3">
                    <StatusRecord id={post.id} status={post.commentable} changeStatus={changeCommentable} />
                    </td>
                    <td className="pl-3 py-3">{post.summary?.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                    <td className="pl-3 py-3">{post.published_at}</td>
                    <td>
                       <SettingRecord id={post.id} title={post.title}/>
                    </td>
                </tr>)
            })} 
         </CustomTable>  }
    </TableContainer>
    </>
    )
}
export default Index;