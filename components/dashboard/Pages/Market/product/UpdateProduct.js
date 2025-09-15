'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 
import { Editor, Input, InputFrame, InputTags, ResponseError, SelectImage } from '@/components/dashboard/inputs'
import { useGetCategoriesAndBrandsQuery, useGetProductQuery, useUpdateProductMutation } from '@/services/market/productApi'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import EditProductSchema from '@/validation/doshboard/market/product/editProduct'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import { FieldArray, Form, Formik } from 'formik'
import { TableError404, TableLoading } from '@/components/dashboard/Table'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateProduct = ({ params }) => {
    const { openDrawer   } = useSelector((state) => state.util);
    const param = params.id;
    const { data: product = {}, isLoading, isSuccess, isError } = useGetProductQuery(param);
    const {errorData} = useSelector((state)=> state.util)
    const { data: res = [] } = useGetCategoriesAndBrandsQuery();

    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
    }, [isLoading, isSuccess, isError])
  
    const initialValues = {
        name: `${product?.data.name}`,
        marketable: `${product?.data.marketable}`,
        image: '',
        introduction: `${product?.data.introduction}`,
        status: `${product?.data.status}`,
        price: `${product?.data?.price}`,
        tags: `${product?.data.tags}`,
        weight: `${product?.data.weight}`,
        length: `${product?.data.length}`,
        width: `${product?.data.width}`,
        height: `${product?.data.height}`,
        published_at: `${product?.data.published_at}`,
        category_id: `${product?.data.category_id ? product.data?.category_id :''}`,
        brand_id: `${product?.data.brand_id ? product.data?.brand_id :''}`,


    }
    const [UpdateProduct, { data  , isLoading: isSend ,isSuccess:Success}] = useUpdateProductMutation()


    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.image) {
            formData.append("image", values.image);
        }
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
        formData.append("status", values.status);
        formData.append("marketable", values.marketable);
        formData.append("tags", values.tags);
        formData.append("published_at", values.published_at);
        if (values.currentImage) {
            formData.append("currentImage", values.currentImage);
        }
        await UpdateProduct({ id: params.id, formData });
    }
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' محصول با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ویرایش  محصولات"
                sitemapPage=' بخش فروش /ویترین /  محصولات  /ویرایش    محصولات'            >
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

                {isLoading !== null && isLoading === true ? <TableLoading /> : isSuccess !== null && isSuccess === true ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={EditProductSchema}
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

                            {product && product.data.image && <InputFrame name='currentImage' title='انتخاب سایز تصویر' >
                                <SelectImage image={product.data.image} />
                            </InputFrame>
                            }

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
                                                {product.data.metas?.meta_key && product.data.metas?.length > 0 ? (
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
                : isError !== null && isError === true ? <TableError404 /> : null }
            </section>


        </>
    )
}
export default UpdateProduct;
