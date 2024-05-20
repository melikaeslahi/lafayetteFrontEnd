'use client'

import Button from '@/components/dashboard/inputs/Button'
import Input from '@/components/dashboard/inputs/InputFrame'
import { useRouter } from 'next/navigation'
import ResponseError from '@/components/dashboard/inputs/ResponseError'
import TitlePage from '@/components/dashboard/TitlePage'
import { Field, Form, Formik } from 'formik'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Image from 'next/image'

const InputsPage = ({ inputCategory, dataSubmit, item = null, initialValues, data, validation ,selectOptions ,btnName }) => {
    const router = useRouter();
    const { openDrawer } = useSelector((state) => state.util);
    const [errorData, setErrorData] = useState({});
   
    useEffect(() => {
        setErrorData(data);

        if (errorData) {
          
            if (errorData !== null && errorData.status === 200) {
                router.back();
            } else if (errorData.success === false) {
                toast.error(' خطایی پیش آمده است ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }

        }
    }, [data, errorData]);


    return (
        <>
              <TitlePage
                name="ایجاد دسته بندی"
                sitemapPage="دسته بندی ها / ایجاد دسته بندی" 
                
                >
                  <button
                             type="button"
                            onClick={()=>{router.back() }}
                           className=" py-4 px-8 bg-pallete rounded text-white" >
                             {' '}
                            بازگشت
                  </button> 
                </TitlePage>

            <section
                className={`absolute top-40 left-0 z-0 w-screen md:w-screen dark:bg-zinc-700 bg-white ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${openDrawer ? 'xl:w-screen' : 'xl:w-4/5'
                    }  flex flex-col justify-center items-center my-5 rounded`}>

                {errorData ? <ResponseError data={errorData} /> : null}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={values => {
                        // same shape as initial values
                        dataSubmit(values)
                    }}>

                    <Form
                        className={`dark:bg-zinc-700  bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4  font-lotus flex  justify-center items-center`}>
                        <section className="flex  flex-wrap  justify-center items-center">

                            {inputCategory.map(
                                ({
                                    id,
                                    name,
                                    title,
                                    placeholder,
                                    options,
                                    type,
                                }) => (
                                    <Input
                                        key={id}
                                        name={name}
                                        title={title}
                                        placeholder={placeholder}
                                        options={type === 'select' && options ? options : selectOptions }
                                        type={type}
                                        editTags={item ? item.tags : null}
                                         
                                    />
                                ),
                            )}

{ item !== null && item.image && <Field type='radio' name={'currentImage'}
                                className={`shadow-lg text-left appearance-none dark:text-gray-100  dark:bg-zinc-600  rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none   focus:border-pallete  `}
                            >
                                {({ field, form }) => {
                                    const image = item.image;
                                
                                    return (
                                        <>

                                            <section className="flex flex-row justify-between items-center">
                                                {image !== null && Object.entries(image.indexArray).map(([key, value]) => (

                                                    <section className="p-5" key={key}>
                                                        <div className="">
                                                            <input type="radio" name="currentImage" value={key}
                                                                id={`${key}`} className=""
                                                                defaultChecked={image.currentImage === key ? true : false}
                                                                onChange={(event) => {
                                                                    form.setFieldValue(field.name, event.target.value)


                                                                }}
                                                            />
                                                            <label htmlFor={`${key}`} className="">
                                                                <Image src={` ${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="" width={key === 'large' ? 250 : key === 'medium' ? 150 : 100} height={key === 'large' ? 250 : key === 'medium' ? 150 : 100} className="w-100" />
                                                            </label>
                                                        </div>
                                                    </section>
                                                )




                                                )

                                                }
                                            </section>

                                        </>
                                    )
                                }}  

                            </Field>}

                            <Button
                                type="submit"
                                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                                {' '}
                                {btnName}
                            </Button>
                        </section>
                    </Form>


                </Formik>

            </section>

        </>
    )
}
export default InputsPage;