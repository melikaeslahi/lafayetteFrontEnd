'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage' 
import {   useEffect } from 'react'
 
import {   Input   } from '@/components/dashboard/inputs'
 
 
 
import CreateGallerySchema from '@/validation/doshboard/market/gallery/createGalleryValidations'
import { useAddNewGalleryMutation } from '@/services/market/galleryApi'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateGallery = ({params}) => {
 
    const router = useRouter();
 
    const dispatch =useDispatch();
 
    const initialValues = {
       
        image: '',
        
    }
    const [addNewGallery, { data , isLoading: isSend ,isSuccess:Success }] =  useAddNewGalleryMutation()
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('تصویر با موفقیت  اضافه شد.')); 
        }
    }, [data,  Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("image", values.image);
        
        await addNewGallery({params , formData});

    }

    return (
        <>
            <TitlePage
                name="ایجاد  تصویر"
                sitemapPage='بخش فروش /ویترین /   محصولات   /     گالری / ایجاد تصویر'
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
                validationSchema={CreateGallerySchema}
                handlerSubmit={handlerSubmit}>
         
          
            
           
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
           
            <Button
             disabled={isSend ? true : false}
                type="submit"
                className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                {' '}
                ایجاد  تصویر
            </Button>

            </InputContainer>

        </>
    )
}
export default CreateGallery;