import * as Yup from 'yup';

 
const DeliverySchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام    روش ارسال الزامی است'),
    amount: Yup.number('میزان تخفیف باید عددی باشد').required('وارد کردن  میزان تخفیف   الزامی است'),
    delivery_time:Yup.number('زمان ارسال باید از نوع عددی  باشد').required('وارد کردن زمان ارسال الزامی است.'),
    delivery_time_unit:Yup.string('').required('وارد کردن  واحد زمان ارسال الزامی است.'),

    
   
})

export default DeliverySchema;