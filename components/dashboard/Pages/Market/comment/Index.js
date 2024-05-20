'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
 
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useChangeApprovedMutation, useChangeCommentStatusMutation, useGetAllCommentQuery } from "@/lib/market/commentApi";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data: comments = [], isError, isLoading, isSuccess } = useGetAllCommentQuery({ page, perPage, search });
 
    const [chengeStatus, { data: dataStatus }] =  useChangeCommentStatusMutation();
    const [chengeApproved, { data: dataApproved }] =  useChangeApprovedMutation();

 

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    const handlerApproved = async (id) => {
        await chengeApproved(id);
    }

    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(comments.data?.length));

    }, [isLoading, isSuccess, isError, comments])

   

    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === true && dataStatus.checked === true) {
                toast.success('کامنت   با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('       کامنت با موفقیت غیر فعال شد  ', {
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
        // status checked and unchecked
        if (dataApproved) {

            if (dataApproved.status === true && dataApproved.checked === true) {
                toast.success('      کامنت با موفقیت   تایید شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataApproved.status === true && dataApproved.checked === false) {

                toast.success('         کامنت با موفقیت   عدم تایید  شد ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataApproved.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataApproved])

    return (<>
        <TitlePage
            name=' کامنت   ها'
            sitemapPage='بخش فروش/ویترین/  کامنت ها'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" disabled>
                {' '}
                ایجاد کامنت
            </Link>
        </TitlePage>

        <TableContainer
            pagination={comments?.meta}
       
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                            <th className="pl-3 py-3">#</th>
                            <th className="pl-3 py-3"> نظر   </th>
                            <td className="pl-3 py-3">پاسخ به</td>
                            <th className="pl-3 py-3">کد کاربر </th>
                            <th className="pl-3 py-3">  نویسنده نظر </th>
                            <th className="pl-3 py-3"> کد محصول </th>
                            <th className="pl-3 py-3"> محصول </th>
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
                        <td className="pl-3 py-3">{comment.parent ? comment.parent.user.first_name + '' +comment.parent.user.last_name : ' '}</td>
                        <td className="pl-3 py-3">{comment.author_id  }</td>
                        <td className="pl-3 py-3">{comment.user.first_name + '' + comment.user.last_name  }</td>
                        <td className="pl-3 py-3">{comment.commentable.id  }</td>
                        <td className="pl-3 py-3">{comment.commentable?.name  }</td>
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