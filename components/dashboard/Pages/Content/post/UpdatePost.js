'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {    useEffect } from 'react'
 
import { Editor, Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
import EditPostSchema from '@/validation/doshboard/content/post/editPostValidate'
import { useGetAllCategoryQuery, useGetPostQuery, useUpdatePostMutation } from '@/lib/content/postApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdataPost = ({ params }) => {
    const { data: post = {}, isLoading, isSuccess, isError } = useGetPostQuery(params.id);

    const { data: categories = [] } = useGetAllCategoryQuery();
    const category = categories && categories.status === 200 ? categories.data : null;
    const dispatch =useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

    const router = useRouter();

    const initialValues = {
        title: `${post.data?.title}`,
        category_id: `${post.data?.category_id ? post.data?.category_id :''}`,
        auther_id: `${post.data?.auther_id}`,
        image: '',
        body: `${post.data?.body}`,
        summary: `${post.data?.summary}`,
        status: `${post.data?.status}`,
        commentable: `${post.data?.commentable}`,
        tags: `${post.data?.tags}`,
        published_at: `${post.data?.published_at}`

    }
    const [UpdatePost, { data , isLoading: isSend ,isSuccess:Success }] = useUpdatePostMutation()

 

    const handlerSubmit = async (values) => {

        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.image) {
            formData.append("image", values.image);
        }
        formData.append("title", values.title);
        if (values.category_id) {
            formData.append("category_id", values.category_id);
        }

        formData.append("body", values.body);
        formData.append("status", values.status);
        formData.append("commentable", values.status);
        formData.append("summary", values.tags);
        formData.append("published_at", values.published_at);
        formData.append("tags", values.tags);
        if (values.currentImage) {
            formData.append("currentImage", values.currentImage);
        }


        await UpdatePost({ id: params.id, formData });

    }


    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('پست با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);


    return (
        <>
            <TitlePage
                name="ایجاد پست"
                sitemapPage="بخش محتوایی  / پست ها / ایجاد پست"

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
                    handlerSubmit={handlerSubmit}
                    validationSchema={EditPostSchema}>

                    <Input name={'title'} title='عنوان پست' placeholder={' عنوان پست ها '} type='text' />
                    <InputTags name={'tags'} title='برچسب ها' placeHolder={'برچسب ها'} editTags={post.data?.tags} />
                    <Input select={'select'} name='category_id' title='دسته بندی' className={'text-left'} >
                        <>
                            <option value=''> اتتخاب والد  </option>

                            {category !== null ? category?.map(({ id, name }) => (
                                <option key={id} value={id} >
                                    {' '}
                                    {name}{' '}
                                </option>
                            )) : null}

                        </>
                    </Input>
                    <Input select={'select'} name='status' title='وضعیت' className={'text-left'} >
                        <>
                            <option value=''> اتتخاب  وضعیت  </option>
                            <option value='1'>  فعال     </option>
                            <option value='0'>   غیر فعال     </option>
                        </>
                    </Input>
                    <JalaliDate name={'published_at'} placeHolder={'تاریخ انتشار'} title={'تاریخ انتشار'} defTime={post.data?.published_at} />
                    <Input select={'select'} name='commentable' title='وضعیت کامنت گذاری' className={'text-left'} >
                        <>
                            <option value=''> اتتخاب  وضعیت  </option>
                            <option value='1'>  فعال     </option>
                            <option value='0'>   غیر فعال     </option>
                        </>
                    </Input>
                    {post && post.data?.image && <InputFrame name='currentImage' title='انتخاب سایز تصویر' >
                        <SelectImage image={post.data?.image} />
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
                    <Editor name='summary' title='  خلاصه ' />
                    <Editor name='body' title='  متن ' />
                    <Button
                     disabled={isSend ? true : false}
                        type="submit"
                        className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                        {' '}
                        ویرایش    پست
                    </Button>

                </InputContainer>
                

        </>
    )
}
export default UpdataPost;
