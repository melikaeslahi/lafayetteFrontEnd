'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {  useEffect } from 'react' 
import { Editor } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useAddNewAnswerMutation, useGetTicketQuery } from '@/lib/ticket/ticketApi'
import ShowTicketSchema from '@/validation/doshboard/ticket/ticket/showValidation'
import { TableError404, TableLoading, TableNotFound } from '@/components/dashboard/Table'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const ShowTicket = ({ params }) => {
    const { data: ticket = [] , isSuccess , isLoading , isError } = useGetTicketQuery( params);

    const router = useRouter();
    const dispatch =useDispatch();
 

    const initialValues = {

         description: '',

    }
    const [addNewAnswer, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewAnswerMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' تیکت با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object

        formData.append("description", values.description);


        await addNewAnswer({ formData, id: params });

    }

    return (
        <>
            <TitlePage
                name="نمایش  تیکت"
                sitemapPage='بخش فروش /ویترین / تیکت ها / نمایش  تیکت    '
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>



            <InputContainer 
                initialValues={initialValues}
                validationSchema={ShowTicketSchema}
                handlerSubmit={handlerSubmit}>
             {
               isLoading ? <TableLoading /> : isSuccess ?  <section className='flex flex-col items-center justify-center basis-3 w-full shadow-md shadow-pallete p-5 m-5 '>

                <h1 className='text-pallete text-lg pb-3 mb-3 border-b-2 border-pallete'>      {ticket.data.admin ? ticket.data.admin.admin.first_name + ' ' + ticket.data.admin.admin.last_name : ' نامشخص'}  </h1>
                <h3>  موضوغ   :  {ticket.data.subject ?? '_'}     </h3>
                <p>  متن کامنت:{ticket.data?.description}  </p>


                {ticket.data.children?.map((child, index) => (
                    <section key={index} className='flex flex-col items-center justify-center w-full basis-2/3 shadow-md shadow-pallete p-5 m-5 '>


                        <section className='w-full border-b-2 border-pallete m-2 p-3'>
                            <h1 className='text-pallete text-lg'>      {child.user.first_name + ' ' + child.user.last_name} _  پاسخ دهنده   :  {child.admin.admin.first_name + ' ' + child.admin.admin.last_name ?? '_'}  </h1>
                            <p> {child?.created_at}  </p>
                        </section>

                        <h3>      </h3>
                        <p className='p-3'>  متن کامنت:{child?.description}  </p>

                    </section>))}


            </section> : isError ? <TableError404 /> : <TableNotFound />}
              
                { ticket.data?.status == 0 ? <><Editor name='description' title=' پاسخ ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ثبت پاسخ
                    </Button></> : ''

                }


            </InputContainer>

        </>
    )
}
export default ShowTicket;