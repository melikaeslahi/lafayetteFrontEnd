'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import {   useEffect } from 'react'
import { Input } from '@/components/dashboard/inputs'
import { useAddNewBannerMutation, useGetPositionsQuery } from '@/services/content/bannerApi'
import CreateBannerSchema from '@/validation/doshboard/content/banner/createBanner'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { useDispatch  } from 'react-redux'
import { setErrorData ,setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'


const CreateBanner = () => {
    const router = useRouter();
    const dispatch =useDispatch();
    const initialValues = {
        title: '',
        position: '',
        image: '',
        url: '',
        status: '',

    }
    const { data: positions = [], isSuccess } = useGetPositionsQuery();
    
    const [addNewBanner, { data , isLoading: isSend ,isSuccess:Success }] = useAddNewBannerMutation()
   
    useEffect(() => {
        dispatch(setErrorData(data)); 
        if(Success){
        dispatch(setSuccessMessage('بنر با موفقیت ایجاد شد.')); 
        }
    }, [data , Success]);

    const handlerSubmit = async (values) => {

        // Create an object of formData
        const formData = new FormData();

        formData.append("image", values.image);
        formData.append("title", values.title);
        formData.append("position", values.position);
        formData.append("url", values.url);
        formData.append("status", values.status);

        await addNewBanner(formData);

    }

    return (
        <>
            <TitlePage
                name="ایجاد بنر"
                sitemapPage='بخش محتوایی / بنر ها / ایجاد بنر'
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>

            <InputContainer handlerSubmit={handlerSubmit}
                initialValues={initialValues}
              
                validationSchema={CreateBannerSchema} >
                <Input name='title' title={'عنوان بنر'} type='text' placeholder={'تبلیغ ساعت'} />
                <Input name='url' title={'لینک'} type='text' placeholder={'https://toplearn'} />


                <Input name='position' title={'  موقعیت بنر  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  موقعیت  </option>

                        {isSuccess && positions.positions?.map((value, index) => (
                            <option key={index} value={index} >
                                {' '}
                                {value}{' '}
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
                <Button
                     disabled={isSend ? true : false}
                     type="submit"
                    className="text-white hover:bg-clifford hover:text-pallete bg-pallete py-4 px-8 basis-1/2 rounded-lg">
                    {' '}
                    ایجاد بنر
                </Button>
            </InputContainer>


        </>
    )
}
export default CreateBanner;