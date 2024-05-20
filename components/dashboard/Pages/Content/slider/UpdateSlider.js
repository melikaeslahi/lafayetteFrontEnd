'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {   Input  } from '@/components/dashboard/inputs'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess } from '@/store/reducers/dashboard/UtilSlice'
import { useGetAllParentIdQuery, useGetSliderQuery, useUpdateSliderMutation } from '@/lib/content/sliderApi'
import SliderSchema from '@/validation/doshboard/content/slider/sliderValidation'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'

const UpdateSlider = ({ params }) => {
    const { data:  slider = {}, isLoading, isSuccess, isError } =  useGetSliderQuery(params);
 
    const { data: parentId = [] } =  useGetAllParentIdQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])
 
    const initialValues = {
        name: `${slider.data?.name}`,
        parent_id: `${slider.data?.parent_id ? slider.data?.parent_id : ''}`,
     
        status: `${slider.data?.status}`,
        
    }
    const [UpdateSlider, { data , isLoading: isSend ,isSuccess:Success }] =  useUpdateSliderMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        
        formData.append('_method', 'PUT');
        
        formData.append("name", values.name);
        if (values.parent_id) {
            formData.append("parent_id", values.parent_id);
        }
       
        formData.append("status", values.status);
         
        
        await UpdateSlider({ id: params, formData });
    }
    const parent_id = parentId && parentId.status === 200 && parentId.data;
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage(' اسلایدر با موفقیت ویرایش شد.')); 
        }
    }, [data, Success]);

    return (
        <>
            <TitlePage
                name="ویرایش اسلایدر"
                sitemapPage=" بخش محتوایی / اسلایدر ها / ویرایش اسلایدر "
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
                validationSchema={SliderSchema}
                handlerSubmit={handlerSubmit} >
           
                <Input name='name' title={' نام اسلایدر'} type='text' />
               
                <Input name='parent_id' title={' دسته والد  '} select={'select'} className={'text-left'} >
                    <>
                        <option> اتتخاب والد  </option>
                        {parent_id  && parent_id.map(({ id, name }) => (
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
              
                <Button
                 disabled={isSend ? true : false}
                    type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ویرایش اسلایدر
                </Button>
                
             

            </InputContainer>

        </>
    )
}
export default UpdateSlider;
