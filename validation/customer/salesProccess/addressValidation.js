import * as Yup from 'yup';

 

 
    const phoneRegExp = /^(\+98|98|0)9\d{9}$/;
const AddressSchema = Yup.object().shape(
    {
        province_id: Yup.number('مقدار انتخاب شده برای استان صحیح نمی باشد').required('انتخاب نام استان الزامی است'),
         city_id: Yup.number('مقدار انتخاب شده برای شهر صحیح نمی باشد').required('    انتخاب نام شهر الزامی است'),
         address: Yup.string().required(' وارد کردن نشانی الزامی است') ,
         postal_code: Yup.number('کد پستی باید از نوع عددی باشد'),
         no: Yup.number().required('وارد کردن شماره پلاک الزامی است'),
         unit:Yup.number().required('وارد کردن واحد الزامی است'),
         receiver:Yup.boolean(),

         recipient_first_name: Yup.string().when( 'receiver' , {
            is:true ,
            then:() =>  Yup.string().min(2, 'نام   دریافت کننده  محصول باید بیشتر از 2 کارکتر باشد').max(100, 'نام  دریافت کننده محصول  کمتر  از  100  کارکتر   باشد').required('نام   دریافت کننده  الزامی است'),
            otherwise: (schema) => schema ,
         }),  
         recipient_last_name: Yup.string().when( 'receiver' , {
            is:true ,
            then:() => Yup.string().min(2, 'نام خانوادگی   دریافت کننده محصول  باید بیشتر از 2 کارکتر باشد').max(100, 'نام خانوادگی دریافت کننده محصول باید  کمتر  از  100  کارکتر   باشد').required('نام  خانوادگی دریافت کننده محصول  الزامی است'),
            otherwise: (schema) => schema ,
         }),
            
         mobile: Yup.string().when( 'receiver' , {
            is:true ,
            then:() => Yup.string().matches(phoneRegExp, ' شماره موبایل معتبر نیست'),
            otherwise: (schema) => schema ,
         }),
    }
    )

    

export default AddressSchema;