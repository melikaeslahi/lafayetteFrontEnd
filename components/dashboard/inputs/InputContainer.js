import ResponseError from "./ResponseError"
import { useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { TableError404, TableLoading } from "../Table";
import { redirect, useRouter } from "next/navigation";
import TitlePage from "../TitlePage";
import useToast from "@/hooks/useToast";
const InputContainer = ({query, message,edit,columns,children  ,initialValues , validationSchema , name , sitemap, handlerSubmit ,className}) => {
    const router = useRouter();
    const [ addRecord, { data :isError ,isLoading,isSuccess }] =  query();
    useEffect(() => {
        if(isSuccess){
            useToast({inputs:true , isSuccess:isSuccess, customMessage:message})
            redirect(router.back());
        }
    }, [isSuccess]);

    const handlerSubmit = async (values) => {
        const formData = new FormData();
        if (edit) {
        formData.append('_method', 'PUT');
        }
        columns.forEach(col => {
            formData.append(`${col}`, values.columns[col]);
        }) 
        await addRecord(formData);

    }

    // , isSuccess , isError , isLoading , errorData ,
    const { openDrawer } = useSelector((state) => state.util);
    return (<>
         <TitlePage
                name={name}
                sitemapPage={sitemap}
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>
        
         <section
                className={`absolute top-40 left-0 z-0 w-full md:w-full dark:bg-zinc-700 bg-white ${openDrawer ? 'lg:w-full xl:w-screen' : 'lg:w-4/5 xl:w-4/5'}    flex flex-col justify-center items-center my-5 rounded`}>

                {isError ? <ResponseError   /> :   null }

                 {isLoading !== null && isLoading === true ? <TableLoading /> : isSuccess !== null && isSuccess === true ?  
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
                             </section>
                         </Form>
                      
                   
                </Formik>
            : isError !== null && isError === true ? <TableError404 /> :  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        handlerSubmit(values)
                    }}>
                    <Form
                        className={`dark:bg-zinc-700  bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4  font-lotus flex  justify-center items-center`}>
                        <section className="flex  flex-wrap  justify-center items-center">
                            {children}
                        </section>
                    </Form>
                </Formik> 
     }  
            </section>  
    </>)
}
export default InputContainer;