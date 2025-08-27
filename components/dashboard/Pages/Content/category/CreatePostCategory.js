'use client'
import CreateCategorySchema from '@/validation/doshboard/content/category/createCategory'
import Button from '@/components/dashboard/inputs/Button'
import {   useEffect } from 'react'
import { Editor, Input, InputTags } from '@/components/dashboard/inputs'
import { useAddNewPostCategoryMutation, useGetAllParentIdQuery } from '@/lib/content/postCategoryApi'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
const CreatePostCategory = () => {
    const { data: parentId = [] } = useGetAllParentIdQuery();
    const dispatch =useDispatch();
 
    const parent_id = parentId && parentId.status === 200 && parentId.data;
    const initialValues = {
        name: '',
        parent_id: '',
        image: '',
        description: '',
        status: '',
        tags: ''
    }
    const [addNewCategory, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewPostCategoryMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' دسته بندی با موفقیت ایجاد شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("image", values.image);
        formData.append("name", values.name);
        if (values.parent_id) {
            formData.append("parent_id", values.parent_id);
        }
        formData.append("description", values.description);
        formData.append("status", values.status);
        formData.append("tags", values.tags);

        await addNewCategory(formData);

    }

    return (
        <>
            <InputContainer  
                initialValues={initialValues}
                validationSchema={CreateCategorySchema}
                handlerSubmit={handlerSubmit}
                name={"ایجاد دسته بندی"}
                sitemap={"بخش محتوایی / دسته بندی ها / ایجاد دسته بندی"}
                >
                <Input name='name' title={'دسته بندی'} type='text' placeholder={'نام دسته یندی'} />
                <InputTags name='tags' placeHolder={'برچسب ها'} title="برچسب ها" />
                <Input name='parent_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب والد  </option>

                        {parent_id && parent_id.map(({ id, name }) => (
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
                    ایجاد دسته بندی
                </Button>
            </InputContainer>


        </>
    )
}
export default CreatePostCategory;