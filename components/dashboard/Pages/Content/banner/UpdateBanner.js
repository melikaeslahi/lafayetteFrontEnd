'use client'
import Button from '@/components/dashboard/inputs/Button'
import { useRouter } from 'next/navigation'
import TitlePage from '@/components/dashboard/TitlePage'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Input, InputFrame, SelectImage } from '@/components/dashboard/inputs'
import { useGetBannerQuery, useGetPositionsQuery, useUpdateBannerMutation } from '@/services/content/bannerApi'
import EditBannerSchema from '@/validation/doshboard/content/banner/editBanner'
import InputContainer from '@/components/dashboard/inputs/InputContainer'
import { setIsError, setIsLoading, setIsSuccess ,setErrorData, setSuccessMessage} from '@/store/reducers/dashboard/UtilSlice'
import { useDispatch, useSelector } from 'react-redux'

const UpdateBanner = ({ params }) => {
    const { data: banner = {}, isLoading, isSuccess, isError } = useGetBannerQuery(params.id);
    const { data: positions = [], isSuccess: success } = useGetPositionsQuery();

    const router = useRouter();
    const {errorData} =  useSelector((state)=> state.util);
    const dispatch =useDispatch();
    useEffect(()=>{
       dispatch(setIsLoading(isLoading));
       dispatch(setIsSuccess(isSuccess));
       dispatch(setIsError(isError));     
    } , [ isLoading ,isSuccess ,isError])
    const initialValues = {
        title: `${banner.data?.title}`,
        position: `${banner.data?.position}`,
        image: '',
        url: `${banner.data?.url}`,
        status: `${banner.data?.status}`,

    }
    const [UpdateBanner, { data ,isLoading: isSend , isSuccess: Success}] = useUpdateBannerMutation()
    const handlerSubmit = async (values) => {
        // Create an object of formData
        let formData = new FormData();
        // Update the formData object
        formData.append('_method', 'PUT');
        if (values.image) {
            formData.append("image", values.image);
        }
        formData.append("title", values.title);
        formData.append("position", values.position)
        formData.append("url", values.url);
        formData.append("status", values.status);

       
        await UpdateBanner({ id: params.id, formData });
    }
    useEffect(() => {
        dispatch(setErrorData(data))
        if(Success){
            dispatch(setSuccessMessage('بنر با موفقیت ویرایش شد.'))
        }
    }, [data ,   Success]);

    return (
        <>
            <TitlePage
                name="ویرایش بنر"
                sitemapPage='بخش محتوایی / بنر ها /  ویرایش بنر'
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>
  
            <InputContainer errorData={errorData}
                initialValues={initialValues}
                handlerSubmit={handlerSubmit}
                validationSchema={EditBannerSchema}>

                <Input name='title' title={'عنوان بنر'} type='text' placeholder={'تبلیغ ساعت'} />
                <Input name='url' title={' لینک'} type='text' placeholder={'https://toplearn'} />

                <Input name='position' title={'  موقعیت بنر  '} select={'select'} className={'text-left'} >
                    <>
                        <option value=''> اتتخاب  موقعیت  </option>

                        {success && positions.positions?.map((value, index) => (
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
                    ویرایش بنر
                </Button>
            </InputContainer>
        
        </>
    )
}
export default UpdateBanner;
