'use client';
 
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import { setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { Table, TableContainer, TableError404, TableLoading, TableNotFound } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
 
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";

import { toast } from "react-toastify";

 
 
import Link from "next/link";
import TicketContainer from "@/components/shop/pages/profile/tickets/TicketContainer";
import { useChangeTicketMutation, useGetAllTicketsMutation  } from "@/services/customer/profile/profileApi";
 



const  Tickets = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const {  isError:error , isLoading:loading , isSuccess:success , length } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const [  Tickets ,  {data:  tickets = [], isError, isLoading, isSuccess} ] =    useGetAllTicketsMutation();

    const [chenge, { data: dataStatus }] =   useChangeTicketMutation();
 

    useEffect(()=>{
        async function  getTicket() {
          const data =  await Tickets().unwrap();
           return data;
        }
        
        getTicket();

    },[])

    const handlerChange = async (id) => {
        await chenge(id);
    }

    
    useEffect(() => {

        dispatch( setIsLoading(isLoading));
        dispatch( setIsSuccess(isSuccess));
        dispatch( setIsError(isError));
        dispatch( setItemLength(tickets?.tickets?.length));

    }, [isLoading, isSuccess, isError, tickets])



    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === true && dataStatus.checked === true) {
                toast.success(' تیکت با موفقیت باز شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('         با موفقیت    بسته  شد  ', {
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

    return (
        <>


            <TicketContainer url={`${pathname}/create`} title={'تیکت های من'} urlName={'ایجاد تیکت'}>
        

        {loading ? <TableLoading/> : ( success ?  (  length > 0 ?  <Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3">#</th>
                        <th className="pl-3 py-3"> نویسنده تیکت </th>
                        <th className="pl-3 py-3"> عنوان تیکت </th>
                        <th className="pl-3 py-3"> دسته تیکت </th>
                        <th className="pl-3 py-3"> اولویت </th>
                        <th className="pl-3 py-3"> ارجاع شده از</th>
                        <th className="pl-3 py-3"> تیکت مرجع </th>
                        <th className="pl-3 py-3">    وضعیت </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    { tickets?.tickets?.map((ticket, index) => {

                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index += 1}</td>




                                <td className="pl-3 py-3">{ticket.user.first_name + '' + ticket.user.last_name }</td>
                                <td className="pl-3 py-3">{ticket.subject}</td>
                                <td className="pl-3 py-3">{ticket.category.name}</td>
                                <td className="pl-3 py-3">{ticket.priority.name}</td>
                                <td className="pl-3 py-3">{ticket.admin ? ticket.admin.admin.first_name + ' ' + ticket.admin.admin.last_name : 'نامشخص' }</td>
                                <td className="pl-3 py-3">{ticket.parent?.subject ?? '_' }</td>
                                <td className="pl-3 py-3">{ticket.status == 1 ? 'بسته' : 'باز' }</td>

                        

                                <td>
                                    <Link href={`${pathname}/show/${ticket.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  نمایش     </Link>

                                    <Button type="button" onClick={() => {
                                         handlerChange(ticket.id)
                                    }} className={`py-2 px-4   ${ticket.status == 1 ? ' bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600' }  rounded text-white`}>  { ticket.status == 1 ?     'باز کردن' : 'بستن'   }  </Button> 
                                        

                                </td>
                            </tr>)
                    })}
                </tbody>
            </Table> : <TableNotFound />
            
            ) : error ? <TableError404 /> : null) }    
     
            
      
            </TicketContainer>
        </>
    )
}
export default Tickets;