'use client'
import EditCategorySchema from '@/validation/doshboard/content/category/editCategory'
import { Editor, Input, InputFrame, InputTags, SelectImage } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useGetAllParentIdQuery, useGetCategoryQuery, useUpdatePostCategoryMutation } from '@/services/content/postCategoryApi'
 

const UpdataPostCategory = ({ params }) => {
    const  query =  useGetCategoryQuery(params.id);
    const category = query.data;
    const { data: parentId = [] } =  useGetAllParentIdQuery();
  
    

 
    const initialValues = {
        name: `${category?.name}`,
        parent_id: `${category?.parent_id ? category?.parent_id : '' }`,
        image: '',
        description: `${category?.description}`,
        status: `${category?.status}`,
        tags: `${category?.tags}`
    }

    
 
    // useEffect(() => {
    //     dispatch(setErrorData(data)); 
    //     if(Success){
    //     dispatch(setSuccessMessage('دسته بندی با موفقیت ویرایش شد.')); 
    //     }
    // }, [data,  Success]);

    return (
        <>
          

            <InputContainer  
                initialValues={initialValues}
                name={'ویرایش دسته بندی'}
                sitemap={" بخش محتوایی / دسته بندی ها / ویرایش دسته بندی "}
                query={useUpdatePostCategoryMutation}
                itemQuery={query}
                message={'دسته بندی با موفقیت ویرایش شد.'}
                validationSchema={EditCategorySchema}
                edit={true}
                // handlerSubmit={handlerSubmit} 
                >
           
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
               
                
             

            </InputContainer>

        </>
    )
}
export default UpdataPostCategory;
