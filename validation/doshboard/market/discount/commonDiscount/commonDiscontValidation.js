import * as Yup from 'yup';

 

 
const CommonDiscountSchema = Yup.object({
    title: Yup.string().min(2, ' عنوان انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'عنوان انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required(' وارد کردن عنوان تخفیف  الزامی است'),
    percentage: Yup.number('درصد تخفیف باید از نوع عددی باشد').min(1, 'حداقل درصد تخفیف 1 می باشد ').max(100, ' حداکثر درصد تخفیف 100 می باشد').required(' وارد کردن درصد تخفیف الزامی است'),
    discount_ceiling:Yup.number('حداکثر درصد تخفیف باید از نوع عددی باشد.').required('وارد کردن حداکثر درصد تخفیف الزامی است'),
    status: Yup.number('وضعیت تخفیف نا معتبر است'),
    start_date: Yup.number('تاریخ شروع باید عددی باشد').required('وارد کردن تاریخ شروع الزامی است'),
    end_date: Yup.number('تاریخ پایان باید عددی باشد').required('وارد کردن تاریخ پایان الزامی است'),
    minimal_order_amount:Yup.number(' سقف خرید کاربر باید از نوع عددی باشد.').required('وارد کردن  سقف خرید کاربر درصد تخفیف الزامی است'),

    
})

export default CommonDiscountSchema;