'use client'
import { Button, Editor, Input, ResponseError } from "@/components/dashboard/inputs";
import TicketContainer from "@/components/shop/pages/profile/tickets/TicketContainer";
import { useAddNewTicketMutation, useGetPriorityAndCategoryMutation } from "@/services/customer/profile/profileApi";
import { setErrorData, setSuccessMessage } from "@/store/reducers/dashboard/UtilSlice";
import TicketStoreSchema from "@/validation/customer/profile/ticketValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const Create = () => {
    const dispatch =useDispatch();
    const router = useRouter();
    const {errorData} =  useSelector(state=>state.util)
    const  [categoryAndPriority , {data}] = useGetPriorityAndCategoryMutation(); 
    const [addTicket , {data:ticket}] = useAddNewTicketMutation();
    const initialValues ={ 
    category_id: '',
    title: '',
    description: '',
    priority_id: '',
    file: '',
}
 
useEffect(()=>{
 
  if(ticket?.status === 200 ){
    dispatch( setSuccessMessage(' نظر شما با موفقیت ثبت شد'))
    dispatch( setErrorData(ticket));
  }else if (ticket?.success === false) {
    dispatch(setErrorData(ticket))
}
} , [ticket])

useEffect(()=>{
    async function getData(){
        await categoryAndPriority().unwrap();

    }
    getData();
} , [])
 const  handlerSubmit = async(values)=>{
     const formData = new FormData();
     formData.append('category_id' , values.category_id);
     formData.append('subject' , values.title);
     formData.append('description' , values.description);
     formData.append('priority_id' , values.priority_id);
     if(values.file){
     formData.append('file' , values.file);
     }

    await addTicket(formData);
}
    return (
        <>
            <TicketContainer url={`/profile/tickets`} urlName={'بازگشت'} title={'ایجاد تیکت'}>
                 
            {errorData ? <ResponseError /> : null }  
                <Formik

                    onSubmit={(values) =>  handlerSubmit(values)}
                    initialValues={initialValues}
                    validationSchema={TicketStoreSchema}
                >
                    <Form className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1">
                        <Input title='عنوان' type={'text'} name='title' placeholder={'مثل: مشکل در خرید'} />
                        <Input name='category_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                            <>
                                <option> اتتخاب والد  </option>
                                {  data?.ticketCategories?.map(({ id, name }) => (
                                    <option key={id} value={id} >
                                        {' '}
                                        {name}{' '}
                                    </option>
                                ))}
                            </>
                        </Input>
                        <Input name='priority_id' title={' اولویت '} select={'select'} className={'text-left'} >
                            <>
                                  <option> اتتخاب والد  </option>
                                {data?.ticketPriorities?.map(({ id, name }) => (
                                    <option key={id} value={id} >
                                        {' '}
                                        {name}{' '}
                                    </option>
                                ))}  
                            </>
                        </Input>

                        <Input name={'file'} title={'تصویر'} >
                            {({ field, form }) => {
                                return (
                                    <>
                                        <input type='file'
                                            accept='image/*'
                                            onChange={(event) => {
                                                form.setFieldValue(field.name, event.target.files[0])
                                            }}
                                        />
                                    </>
                                )
                            }}
                        </Input>
                        <Editor   containerClass={'  col-span-2 w-full lg:basis-full xl:basis-full'} name={'description'} title={'متن تیکت'} />
                        <section className="flex justify-center items-center w-full col-span-2 place-items-center">
                            <Button
                                type="submit"
                                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8   rounded-lg">
                                {' '}
                                ایجاد تیکت
                            </Button>
                        </section>

                    </Form>
                </Formik>
            </TicketContainer>
        </>
    )
}
export default Create;
