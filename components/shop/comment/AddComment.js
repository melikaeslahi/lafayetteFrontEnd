import { Editor, Input } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import { useAddCommentMutation } from "@/lib/customer/market/productApi";
import { modalOpenClose, setErrorData,  setIsCommentModal,  setSuccessMessage } from "@/store/reducers/dashboard/UtilSlice";
import CommentSchema from "@/validation/customer/market/commentValidation";
import {  Form, Formik } from "formik";
import { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
const AddComment = () => {
    const { isOpenModal ,isCommentModal  } = useSelector(state => state.util);
    const {  slug ,commentModal  } = useSelector(state => state.productCustomer);
    const [ addComment, { data }] =    useAddCommentMutation();
    
    const dispatch = useDispatch();
    useEffect(() => {
        if (data?.status === 200) {
            dispatch(setSuccessMessage(' نظر شما با موفقیت ثبت شد'))
            dispatch(setErrorData(null));

        } else if (data?.success === false) {
            dispatch(setErrorData(data))
        }
    }, [data])

    const initialValues = {
   
    body:``
    }

    const handlerSubmit = async (values) => {
        // console.log(values)
        const formData = new FormData();

        
        formData.append('body', values.body);
        


        await addComment({formData , slug});

        dispatch(setIsCommentModal(false));
    }


 
    return (
        <>
             <Modal title={'  ثبت نظر     '}  show={isCommentModal} closeMethod={setIsCommentModal} >
                <Formik
                    initialValues={initialValues}
                     validationSchema={CommentSchema}
                    onSubmit={(values) =>  handlerSubmit(values)}

                >
             
                    <Form className="grid grid-flow-row grid-cols-1 md:grid-flow-col md:grid-cols-1 lg:grid-flow-row lg:grid-cols-2 xl:grid-cols-2 gap-2">
                        <>
                          
                        <Editor name='body' containerClass={'w-full'} title={'متن نظر'} />

                            <button type="submit" className="bg-clifford w-full text-pallete border rounded-lg border-pallete px-4 py-1 m-2" >  ایجاد آدرس </button>
                            <button
                                className="bg-white text-pallete border rounded-lg border-pallete px-4 py-1 m-2"
                                onClick={() =>{ dispatch(setIsCommentModal(false))
                                }}>

                                بستن
                            </button>
                        </>

                    </Form>
              
                </Formik>
            </Modal>  
        </>
    )
}
export default AddComment;
