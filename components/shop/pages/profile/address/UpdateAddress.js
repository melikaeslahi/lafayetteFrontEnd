import { Input } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import { useGetProvinceQuery, useUpdateProfileMutation } from "@/services/customer/profile/profileApi";
import { useGetCitiesMutation, useUpdateAddressMutation } from "@/services/customer/salesProccess/addressApi";

import { modalOpenClose, setErrorData, setHandlerModal, setIsUpdateAddressModal, setSuccessMessage } from "@/store/reducers/dashboard/UtilSlice";
import ProfileSchema from "@/validation/customer/profile/profileValidation";
import AddressSchema from "@/validation/customer/salesProccess/addressValidation";


import { Field, Form, Formik } from "formik";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const UpdateAddress = () => {
    const address = JSON.parse(localStorage.getItem('address'));
    const [check, setCheck] = useState(false);
    const [ provinceSelected,  setProvinceSelected] = useState(address?.province_id);

    const { isOpenModal, isIdAddress ,isUpdateAddressModal } = useSelector(state => state.util);
     
    const [updateAddress, { data }] = useUpdateAddressMutation();
    const { data: province } = useGetProvinceQuery();
    const [getProvince, { data: provinceCities }] = useGetCitiesMutation();

 
 
    const dispatch = useDispatch();

 

    useEffect( ()=>{
        async function provinceCities (){
           await getProvince(provinceSelected);
        }

        provinceCities();
          
    } ,[provinceSelected])

    useEffect(() => {
        if (data?.status === 200) {
            dispatch(setSuccessMessage(' آدرس با موفقیت ویرایش شد'))
            dispatch(setErrorData(null));

        } else if (data?.success === false) {
            dispatch(setErrorData(data))
        }

    }, [data])

 

    const initialValues = {
        city_id: `${address?.city_id  ?? ''}`,
        province_id: ``,
        postal_code: `${address?.postal_code ?? ''}`,
        address: `${address?.address ?? ''}`,
        unit: `${address?.unit ?? ''}`,
        no: `${address?.no ?? ''}`,
        recipient_first_name: `${address?.recipient_first_name ?? ''}`,
        receiver: `${address?.receiver ?? ''}`,
        mobile: `${address?.mobile ?? ''}`,
        recipient_last_name: `${address?.recipient_last_name ?? ''}`,
    }

    const handlerSubmit = async (values) => {
         
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('province_id', values.province_id);
        formData.append('city_id', values.city_id);
        formData.append('postal_code', values.postal_code);
        formData.append('address', values.address);
        formData.append('no', values.no);
        formData.append('unit', values.unit);

        if (values.receiver === true) {
            formData.append('recipient_first_name', values.recipient_first_name);

            formData.append('recipient_last_name', values.recipient_last_name);

            formData.append('mobile', values.mobile);
        }


      const data =  await updateAddress({ formData, id: isIdAddress }).unwrap();
        if(data?.status === 200)
        dispatch(setIsUpdateAddressModal(false));
    }



    return (
        <>
            <Modal title={' ویرایش آدرس '} 
            show={isUpdateAddressModal} 
            closeMethod={setIsUpdateAddressModal} >
                <Formik
                    initialValues={initialValues}
                     validationSchema={AddressSchema}
                    onSubmit={(values) => handlerSubmit(values)}

                >
             
                    <Form className="grid grid-flow-row grid-cols-1 md:grid-flow-col md:grid-cols-1 lg:grid-flow-row lg:grid-cols-2 xl:grid-cols-2 gap-2">
                        <>
                            <Input  name={'province_id'} title={'  نام استان    '} select={'select'}   className={'text-left'} >             
                                {({ field, form }) => (
                                    <>
                                        <select className={'text-left shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete'} value={provinceSelected}
                                        onBlur={(e)=>{form.setFieldValue(field.name , provinceSelected)}}
                                        onChange={(e)=>{
                                            setProvinceSelected(e.target.value);        
                                            form.setFieldValue(field.name , e.target.value)

                                        }}>
                                            <option> اتتخاب والد  </option>

                                            {province?.province.map(({ id, name }) => (
                                                <option key={id} value={id}    >
                                                    {' '}
                                                    {name}{' '}
                                                </option>
                                            ))}
                                        </select>


                                    </>
                                )}
                            </Input>

                            <Input name='city_id' title={'  نام شهر    '} select={'select'} className={'text-left '} >
                                <>
                                    <option> اتتخاب والد  </option>

                                    {provinceCities?.cities.map(({ id, name }) => (
                                        <option key={id} value={id} >
                                            {' '}
                                            {name}{' '}
                                        </option>
                                    ))}
                                </>
                            </Input>
                            <Input title='آدرس' type={'text'} name='address' />
                            <Input title='پلاک' type={'text'} name='no' />
                            <Input title='واحد' type={'text'} name='unit' />
                            <Input title='کد پستی' type={'text'} name='postal_code' />
                            <Input title='دریافت کننده خودم نیستم'
                                type={'checkbox'}
                                name="receiver"
                            >
                                {({ field, form }) => (
                                    <input type="checkbox" name="receiver"
                                    onBlur={(e)=>{form.setFieldValue(field.name , check)}}
                                    onChange={(e) => {

                                        setCheck(e.target.checked);
                                        form.setFieldValue(field.name, e.target.checked );
                                         
                                    }} />
                                )}
                            </Input>
                            {check ? <>
                                <Input title='نام دریافت کننده' type={'text'} name='recipient_first_name' />
                                <Input title=' نام خانوادگی دریافت کننده' type={'text'} name='recipient_last_name' />
                                <Input title='شماره موبایل دریافت کننده' type={'text'} name='mobile' />
                            </> : null}


                            <button type="submit" className="bg-clifford text-pallete border rounded-lg border-pallete px-4 py-1 m-2" >  ویرایش آدرس </button>
                            <button
                                className="bg-white text-pallete border rounded-lg border-pallete px-4 py-1 m-2"
                                onClick={() => dispatch(setIsUpdateAddressModal(false))}>

                                بستن
                            </button>
                        </>

                    </Form>
              
                </Formik>
            </Modal>  
        </>
    )
}
export default UpdateAddress;
