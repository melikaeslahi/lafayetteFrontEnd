'use client';
import TicketContainer from "@/components/shop/pages/profile/tickets/TicketContainer";
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Editor } from '@/components/dashboard/inputs'
import { TableError404, TableLoading, TableNotFound } from '@/components/dashboard/Table'
import { setErrorData, setSuccessMessage } from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { useAnswerTicketMutation, useGetTicketMutation } from "@/services/customer/profile/profileApi";
import TicketAnswerSchema from "@/validation/customer/profile/ticketAnswerValidation";
import Link from "next/link";

const Show = ({params}) => {

    const [  fetchTicket , {data: ticket = [], isSuccess, isLoading, isError} ]=  useGetTicketMutation();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(()=>{ 
      
        async function ticket(){
            await fetchTicket(params.id).unwrap();
        }
         ticket();
    } , [])

    const initialValues = {

        description: '',

    }
    const [addNewAnswer, { data, isLoading: isSend, isSuccess: Success }] =   useAnswerTicketMutation()
    useEffect(()=>{
 
        if(data?.status === 200 ){
          dispatch( setSuccessMessage(' پاسخ  شما با موفقیت ثبت شد'))
          dispatch( setErrorData(ticket));
        }else if (data?.success === false) {
          dispatch(setErrorData(ticket))
      }
      } , [data])

     

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object

        formData.append("description", values.description);


        await addNewAnswer({ formData, id: params.id });

    }
    return (<>
        <TicketContainer url={`/profile/tickets`} urlName={'بازگشت'} title={'نمایش تیکت'} >
            <>
                {
                    isLoading ? <TableLoading /> : isSuccess ? <section className='flex flex-col items-center justify-center basis-3 w-full shadow-md shadow-pallete p-5 m-5 '>

                        <h1 className='text-pallete text-lg pb-3 mb-3 border-b-2 border-pallete'>      {ticket.ticket.user ? ticket.ticket.user.first_name + ' ' + ticket.ticket.user.last_name : ' نامشخص'}  </h1>
                        <h3>  موضوغ   :  {ticket.ticket.subject ?? '_'}     </h3>
                        <p>  متن کامنت:{ticket.ticket?.description}  </p>


                        {ticket.ticket.children?.map((child, index) => (
                            <section key={index} className='flex flex-col items-center justify-center w-full basis-2/3 shadow-md shadow-pallete p-5 m-5 '>


                                <section className='w-full border-b-2 border-pallete m-2 p-3'>
                                    <h1 className='text-pallete text-lg'>      {child.user.first_name + ' ' + child.user.last_name} _  پاسخ دهنده   :  {child?.admin?.admin.first_name + ' ' + child?.admin?.admin.last_name ?? '_'}  </h1>
                                    <p> {child?.created_at}  </p>
                                </section>

                                <h3>      </h3>
                                <p className='p-3'>  متن کامنت:{child?.description}  </p>

                            </section>))}
                        {ticket.ticket.file.lenght > 0}
                            <section class="card-footer">
                                <Link class="btn btn-success" href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${ticket.ticket.file.file_path}`} download>دانلود
                                    ضمیمه</Link>
                            </section>


                    </section> : isError ? <TableError404 /> : <TableNotFound />}

                {ticket.ticket?.status == 0 ? <>

                    <Formik

                        onSubmit={(values) => handlerSubmit(values)}
                        initialValues={initialValues}
                        validationSchema={TicketAnswerSchema}
                    >
                        <Form className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1">
                            <Editor name='description' title=' پاسخ ' />
                            <Button
                                disabled={isSend ? true : false}
                                type="submit"
                                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                                {' '}
                                ثبت پاسخ
                            </Button>
                            </Form>
                            </Formik>
                            </>

                        : ''

                }




                    </>
                   
                </TicketContainer>
            </>)
}
            export default Show;