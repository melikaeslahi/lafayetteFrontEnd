import ResponseError from "./ResponseError"
import { useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { TableError404, TableLoading } from "../Table";
const InputContainer = ({children  ,initialValues , validationSchema , handlerSubmit ,className}) => {
    const { openDrawer , isSuccess , isError , isLoading , errorData , messageSuccess} = useSelector((state) => state.util);
    return (<>
         <section
                className={`absolute top-40 left-0 z-0 w-full md:w-full dark:bg-zinc-700 bg-white ${openDrawer ? 'lg:w-full xl:w-screen' : 'lg:w-4/5 xl:w-4/5'}    flex flex-col justify-center items-center my-5 rounded`}>

                {errorData ? <ResponseError   /> :   null }

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