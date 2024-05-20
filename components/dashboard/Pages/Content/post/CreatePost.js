'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {  useEffect } from 'react'
import { Editor, Input, InputTags } from '@/components/dashboard/inputs'
import CreatePostSchema from '@/validation/doshboard/content/post/createPostValidate'
import { useAddNewPostMutation, useGetAllCategoryQuery } from '@/lib/content/postApi'
import JalaliDate from '@/components/dashboard/inputs/JalaliDate'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const CreatePost = () => {
    const { data: categories = [], isSuccess } = useGetAllCategoryQuery();
    const router = useRouter();
    const dispatch =useDispatch();
    const category = categories && categories.status === 200  ? categories.data : null;

    const initialValues = {
        title: '',
        category_id: '',
        image: '',
        body: '',
        summary: '',
        status: '',
        commentable: '',
        tags: '',
        published_at: ''
    }
    const [addNewPost, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewPostMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('پست با موفقیت ایجاد شد.')); 
        }
    }, [data, Success]);


    const handlerSubmit = async (values) => {
        const formData = new FormData()
       

        if (values.image) {
            formData.append("image", values.image);
        }
        formData.append("title", values.title);

        formData.append("category_id", values.category_id);

        // formData.append("author_id", 1 );

        formData.append("body", values.body);
        formData.append("status", values.status);
        formData.append("commentable", values.status);
        formData.append("summary", values.tags);
        if (values.published_at) {
            formData.append("published_at", values.published_at);
        }
        formData.append("tags", values.tags);


        await addNewPost(formData);

    }

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
                validationSchema={CreatePostSchema}>

                <Input name={'title'} title='عنوان پست' placeholder={' عنوان پست ها '} type='text' />
                <InputTags name={'tags'} title='برچسب ها' placeHolder={'برچسب ها'} />
                <Input select={'select'} name='category_id' title='دسته بندی' className={'text-left'} >
                    <>
                        <option value=''> اتتخاب والد  </option>

                         { category !== null ? category?.map(({ id, name }) => (
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
                <Input select={'select'} name='commentable' title='وضعیت کامنت گذاری' className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  وضعیت  </option>
                        <option value='1'>  فعال     </option>
                        <option value='0'>   غیر فعال     </option>
                    </>
                </Input>
                <JalaliDate name={'published_at'} placeHolder={'تاریخ انتشار'} title={'تاریخ انتشار'} />
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
                    ایجاد پست
                </Button>

            </InputContainer>

        </>
    )
}
export default CreatePost;