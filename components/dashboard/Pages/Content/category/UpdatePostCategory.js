'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useEffect } from 'react'
import EditCategorySchema from '@/validation/doshboard/content/category/editCategory'
import { Editor, Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
import { useGetAllParentIdQuery, useGetCategoryQuery, useUpdatePostCategoryMutation } from '@/lib/content/postCategoryApi'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdataPostCategory = ({ params }) => {
    const { data: item = {}, isLoading, isSuccess, isError } = useGetCategoryQuery(params.id);
    const category = item.data;
    const { data: parentId = [] } = useGetAllParentIdQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])

 
    const initialValues = {
        name: `${category?.name}`,
        parent_id: `${category?.parent_id ? category?.parent_id : '' }`,
        image: '',
        description: `${category?.description}`,
        status: `${category?.status}`,
        tags: `${category?.tags}`
    }
    const [UpdateCategory, { data , isLoading: isSend ,isSuccess:Success }] = useUpdatePostCategoryMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.image) {
            formData.append("image", values.image);
        }
        formData.append("name", values.name);
        if (values.parent_id) {
            formData.append("parent_id", values.parent_id);
        }
        formData.append("description", values.description);
        formData.append("status", values.status);
        formData.append("tags", values.tags);
        if (values.currentImage) {
            formData.append("currentImage", values.currentImage);
        }
        await UpdateCategory({ id: params.id, formData });
    }
 
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('دسته بندی با موفقیت ویرایش شد.')); 
        }
    }, [data,  Success]);

    return (
        <>
            <TitlePage
                name="ایجاد دسته بندی"
                sitemapPage=" بخش محتوایی / دسته بندی ها / ویرایش دسته بندی "
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
                validationSchema={EditCategorySchema}
                handlerSubmit={handlerSubmit} >
           
                <Input name='name' title={'دسته بندی'} type='text' />
                <InputTags name='tags' placeHolder={'برچسب ها'} editTags={category?.tags} title="برچسب ها" />
                <Input name='parent_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>
                        {parentId.data?.map(({ id, name }) => (
                            <option key={id} value={id} >
                                {' '}
                                {name}{' '}
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
                {category && category.image && <InputFrame name='currentImage' title='انتخاب سایز تصویر' >
                    <SelectImage image={category.image} />
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
                <Editor name='description' title='   توضیحات ' />
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش دسته بندی
                </Button>
                
             

            </InputContainer>

        </>
    )
}
export default UpdataPostCategory;
