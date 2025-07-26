'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import Link from "next/link";
import { useChangeApprovedPostMutation, useChangeCommentPostStatusMutation, useGetAllCommentPostQuery } from "@/lib/content/commentPostApi";
import TableHeader from "@/components/dashboard/Table/TableHeader";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const  query =  useGetAllCommentPostQuery({ page, perPage, search });
    const comments = query?.data;
    const [chengeStatus, { data: dataStatus }] =   useChangeCommentPostStatusMutation();
    const [chengeApproved, { data: dataApproved }] =    useChangeApprovedPostMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    const handlerApproved = async (id) => {
        await chengeApproved(id);
    }


   useEffect(()=>{
    useToast({dataStatus:dataStatus , message:"کامنت"})
   },[dataStatus])

    useEffect(() => {
        useToast({dataStatus:dataApproved , customMessage:'وضعیت کامنت با موفقیت تغییر کرد'});
    }, [dataApproved])

    return (<>
    <TableHeader 
    title={'کامنت ها'}
    href={`${pathname}/create`}
    sitemap={'بخش فروش/ویترین/کامنت ها'}
    />      
        <TableContainer
            pagination={comments?.meta}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                            <th className="pl-3 py-3">#</th>
                            <th className="pl-3 py-3"> نظر   </th>
                            <td className="pl-3 py-3">پاسخ به</td>
                            <th className="pl-3 py-3">کد کاربر </th>
                            <th className="pl-3 py-3">  نویسنده نظر </th>
                            <th className="pl-3 py-3"> کد پست </th>
                            <th className="pl-3 py-3"> پست </th>
                            <th className="pl-3 py-3"> وضعیت کامنت</th>
                            <th className="pl-3 py-3"> وضعیت  </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {comments.data?.map((comment, index) => {          
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>     
                        <td className="pl-3 py-3">{comment.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{comment.parent_id ? comment.parent_id.user.first_name + '' +comment.parent_id.user.last_name : ' '}</td>
                        <td className="pl-3 py-3">{comment.user.id  }</td>
                        <td className="pl-3 py-3">{comment.user.first_name + '' + comment.user.last_name  }</td>
                        <td className="pl-3 py-3">{comment?.commentable.id  }</td>
                        <td className="pl-3 py-3">{comment?.commentable.title  }</td>
                        <td className="pl-3 py-3">{comment.approved == 1 ? 'تایید شده': 'تایید نشده'  }</td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={comment.status === 1 ? true : false} onChange={() => handlerStatus(comment.id)} />}
                        </td>

                        <td>
                            <Link href={`${pathname}/show/${comment.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  نمایش     </Link>

                            {comment.approved == 1 ? <Button type="button" onClick={() => {
                                 handlerApproved(comment.id)
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">    عدم تایید    </Button> :
                            <Button type="button" onClick={() => {
                                handlerApproved(comment.id)
                           }} className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded text-white">      تایید    </Button>
                            }                      
                        </td>
                    </tr>)
            })}
                </tbody>    
             </Table>}
        </TableContainer>
    </>
    )
}
export default Index;