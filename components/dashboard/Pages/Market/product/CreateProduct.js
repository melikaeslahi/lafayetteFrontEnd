'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
 
 
import { Editor, Input, InputTags, ResponseError } from '@/components/dashboard/inputs'
import { useAddNewProductMutation, useGetCategoriesAndBrandsQuery, } from '@/lib/market/productApi'
import CreateProductSchema from '@/validation/doshboard/market/product/createProduct'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import {  FieldArray, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'



const CreateProduct = () => {
    const { data: res = [] } = useGetCategoriesAndBrandsQuery();
    const router = useRouter();
    const dispatch =useDispatch();
    const { openDrawer } = useSelector((state) => state.util);

   const {errorData} = useSelector((state)=>state.util);

 



    const initialValues = {
        name: '',
        marketable: '',
        image: '',
        introduction: '',
        status: '',
        price: '',
        tags: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        published_at: '',
        category_id: '',
        brand_id: '',
    }
    const [addNewProduct, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewProductMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' محصول با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {
       
        
        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("image", values.image);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category_id", values.category_id);
        formData.append("brand_id", values.brand_id);
        formData.append("name", values.name);

        if (values.weight) {
            formData.append("weight", values.weight);
        }
        if (values.length) {
            formData.append("length", values.length);
        }
        if (values.width) {
            formData.append("width", values.width);
        }
        if (values.height) {
            formData.append("height", values.height);
        }
        formData.append("introduction", values.introduction);
        formData.append("meta_key", values.meta_key);
        formData.append("meta_value", values.meta_value);


        formData.append("status", values.status);
        formData.append("marketable", values.marketable);
        formData.append("tags", values.tags);
        formData.append("published_at", values.published_at);


        await addNewProduct(formData);

    }


    return (
        <>
            <TitlePage
                name="ایجاد محصول"
                sitemapPage='بخش فروش /ویترین / محصولات  /ایجاد محصول'
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
                className={`absolute top-40 left-0 z-0 w-screen md:w-screen dark:bg-zinc-700 bg-white ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${openDrawer ? 'xl:w-screen' : 'xl:w-4/5'
                    }  flex flex-col justify-center items-center my-5 rounded`}>

                {errorData ? <ResponseError   /> : null}


                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateProductSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        handlerSubmit(values)
                    }}>

                    {({ values }) => (<Form
                        className={`dark:bg-zinc-700  bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4  font-lotus flex  justify-center items-center`}>
                        <section className="flex  flex-wrap  justify-center items-center">



                            <Input name='name' title={'نام محصول'} type='text' placeholder={' مثل:تیشرت '} />
                            <Input name='price' title={'قیمت'} type='text' placeholder={' مثل: 300 '} />
                            <Input name='weight' title={'وزن'} type='text' placeholder={' مثل: 300 '} />
                            <Input name='length' title={'طوال'} type='text' placeholder={' مثل: 300 '} />
                            <Input name='width' title={'عرض'} type='text' placeholder={' مثل: 30 '} />
                            <Input name='height' title={'ارتفاع'} type='text' placeholder={' مثل: 300 '} />

                            <InputTags name='tags' placeHolder={'برچسب ها'} title="برچسب ها" />
                            <Input name='category_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                                <>
                                    <option> اتتخاب  دسته  </option>

                                    {res.categories?.map(({ id, name }) => (
                                        <option key={id} value={id} >
                                            {' '}
                                            {name}{' '}
                                        </option>
                                    ))}
                                </>
                            </Input>
                            <Input name='brand_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                                <>
                                    <option>     انتخاب برند  </option>

                                    {res.brands?.map(({ id, persian_name }) => (
                                        <option key={id} value={id} >
                                            {' '}
                                            {persian_name}{' '}
                                        </option>
                                    ))}
                                </>
                            </Input>
                            <Input name='status' title={'وضعیت'} select={'select'} className={'text-left'} >
                                <>
                                    <option value=''> اتتخاب  وضعیت  </option>
                                    <option value='1'>  فعال     </option>
                                    <option value='0'>   غیر فعال     </option>
                                </>
                            </Input>
                            <Input name='marketable' title={'قابلیت فروش'} select={'select'} className={'text-left'} >
                                <>
                                    <option value=''> اتتخاب  قابلیت فروش  </option>
                                    <option value='1'>  فعال     </option>
                                    <option value='0'>   غیر فعال     </option>
                                </>
                            </Input>

                            <Input name={'image'} title={'تصویر'} >
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
                            <JalaliDate name={'published_at'} placeHolder={'تاریخ انتشار'} title={'تاریخ انتشار'} />

                            <Editor name='introduction' title=' توضیحات ' />


                            <section className='flex justify-center items-center basis-2/3'>

                                <FieldArray
                                    name="meta_key"
                                    render={
                                        arrayHelpers => (
                                            <div>
                                                {values.meta_key && values.meta_key.length > 0 ? (
                                                    values.meta_key.map((meta, index) => (
                                                        <div key={index}>
                                                            <Input name={`meta_key.${index}`} title={'ویژگی'} />
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                                        {/* show this when user has removed all friends from the list */}
                                                        اضافه کردن ویژگی
                                                    </button>
                                                )}

                                            </div>
                                        )

                                    }
                                />

                                <FieldArray
                                    name="meta_value"
                                    render={
                                        arrayHelpers => (
                                            <div>
                                                {values.meta_value && values.meta_value.length > 0 ? (
                                                    values.meta_value.map((meta, index) => (
                                                        <div key={index}>
                                                            <Input name={`meta_value.${index}`} title={'مقدار'} />
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                                        {/* show this when user has removed all friends from the list */}
                                                        اضافه کردن  مقدار
                                                    </button>
                                                )}

                                            </div>
                                        )

                                    }
                                />
                            </section>


                            <Button
                             disabled={isSend ? true : false}
                                type="submit"
                                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                                {' '}
                                ایجاد  محصول
                            </Button>

                        </section>
                    </Form>)}

                </Formik>

            </section>

        </>
    )
}
export default CreateProduct;


{/* <section className='flex justify-center items-center basis-2/3'>
<Input name={'meta_key'} placeholder={'سایز'} title={'ویژگی ها'} >

    {({ field, form }) => {
        return (
            <>
                <input type='text'
                      ref={keyRef}
                      className={'shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete '}

                    onChange={() => {
                    
                        form.setFieldValue(field.name, metaKey)
                        console.log('field key', form)
                    }}
                />
                <p> {metaKey} </p>
            </>
        )
    }}
</Input>
<Input name={'meta_value'} placeholder={'سایز'} title={'مقدار'} >

    {({ field, form }) => {

        return (
            <>
                <input type='text'
                      ref={valueRef}  
                      className={'shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete '}
                    onChange={() => {
                        
                        form.setFieldValue(field.name, metaValue)
                        console.log('field value', metaValue)
                    }}
                />
                <p> {metaValue} </p>
            </>
        )
    }}
</Input>

<button type='button' className='bg-yellow-300 text-black h-10 px-3 rounded hover:bg-yellow-400' onClick={handlerMetas}>افزودن</button>
</section> */}