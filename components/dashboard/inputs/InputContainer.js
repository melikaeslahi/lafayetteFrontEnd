import { useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { redirect, useRouter } from "next/navigation";
import TitlePage from "../TitlePage";
import useToast from "@/hooks/useToast";
import Button from './Button';
import { useEffect } from 'react';
import QueryStatusHandler from '../QueryStatusHandler';
import InputLayout from './InputLayout';
const InputContainer = ({ itemQuery, query, message,edit,columns,children  ,initialValues , validationSchema , name , sitemap, handlerSubmits ,className}) => {
    const router = useRouter();
    const [ addRecord, { data :isError ,isLoading,isSuccess }] =  query();
     useEffect(() => {
        if(isSuccess){
            useToast({inputs:true , isSuccess:isSuccess, customMessage:message})
            redirect(router.back());
        }
    }, [isSuccess]);

    const handlerSubmit = async (values) => {
        console.log(values)
        // const formData = new FormData();
        // if (edit) {
        // formData.append('_method', 'PUT');
        // }
        // columns.forEach(col => {
        //     formData.append(`${col}`, values.columns[col]);
        // }) 
        // await addRecord(formData);

    }

    const { openDrawer } = useSelector((state) => state.util);
    return (<>
     
        
        <InputLayout name={name} query={itemQuery} sitemap={sitemap} >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        handlerSubmit(values)
                    }}>
                             <Form
                             className={ `  dark:bg-zinc-700  bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4  font-lotus flex  justify-center items-center`}>
                             <section className={`${className} flex  flex-wrap  justify-center items-center`}>
                                 {children}
                                 <Button
                                disabled={isLoading ? true : false}
                                type="submit"
                                 className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                                 {' '}
                                 {name}
                                 </Button>
                             </section>
                         </Form>  
                </Formik>
                </InputLayout>
            
    </>)
}
export default InputContainer;