'use client'
import { CustomTable, SettingRecord, StatusRecord ,CustomTable, TableContainer ,TableHeader } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { useChangeApprovedMutation, useChangeCommentStatusMutation, useGetAllCommentQuery } from "@/lib/market/commentApi";
import useToast from "@/hooks/useToast";

const headers= ['نظر' , 'پاسخ به' , 'کد کاربر' ,'نویسنده نظر' , 'کد محصول' , 'محصول' , 'وضعیت کامنت' , 'وضعیت' ,'تنظیمات' ] 

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query = useGetAllCommentQuery({ page, perPage, search });
    const comments = query?.data;
    const [changeStatus, { data: dataStatus }] =  useChangeCommentStatusMutation();
    const [changeApproved, { data: dataApproved }] =  useChangeApprovedMutation();

    const handlerApproved = async (id) => {
        await changeApproved(id);
    }

    useEffect(() => {
       useToast({dataStatus:dataStatus , message:'کامنت'});
    }, [dataStatus])

    useEffect(() => {
        let message;
        if (dataApproved) {
            if (dataApproved.status === true && dataApproved.checked === true) {
               message = 'کامنت با موفقیت تایید شد';
            } else  {
                message='کامنت با موفقیت عدم تایید شد'
            }
        }
        useToast({dataStatus:dataApproved, customMessage:message});

    }, [dataApproved])

    return (<>
        <TableHeader 
        title={'کامنت'}
        sitemap={'بخش فروش/ویترین/ کامنت ها'}
        href={`${pathname}/create`}
        />
         
        <TableContainer
            pagination={comments?.meta}
            query={query}
        >
          {<CustomTable headers={headers}>  
            {comments.data?.map((comment) => {
                return (
                  <tr key={comment.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                    <td className="pl-3 py-3">{comment.id}</td> 
                    <td className="pl-3 py-3">{comment.body.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                    <td className="pl-3 py-3">{comment.parent ? comment.parent.user.first_name + '' +comment.parent.user.last_name : ' '}</td>
                    <td className="pl-3 py-3">{comment.author_id  }</td>
                    <td className="pl-3 py-3">{comment.user.first_name + '' + comment.user.last_name  }</td>
                    <td className="pl-3 py-3">{comment.commentable.id  }</td>
                    <td className="pl-3 py-3">{comment.commentable?.name  }</td>
                    <td className="pl-3 py-3">{comment.approved == 1 ? 'تایید شده': 'تایید نشده'  }</td>
                    <td className="pl-3 py-3">
                        <StatusRecord status={comment.status} id={comment.id} changeStatus={changeStatus} />
                    </td>
                    <td>
                          <SettingRecord id={comment.id}/>
                          <Button type="button" onClick={() => { handlerApproved(comment.id)}}
                              className={`${comment.approved == 1 
                                ?'bg-red-500 hover:bg-red-600'
                                :'bg-green-500 hover:bg-green-600'}
                               py-2 px-4 rounded text-white`}> 
                                {comment.approved === 1 ? 'عدم تایید' : تایید} 
                          </Button>  
                    </td>
                </tr>)
            })}   
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;