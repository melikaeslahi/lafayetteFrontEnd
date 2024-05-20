import * as Yup from 'yup';

 
 
 
const CopanSchema = Yup.object({
    code: Yup.string().required('     وارد کردن کد کپن الزامی است'),
    amount_type: Yup.number('مقدار نامعتبر می باشد').required('وارد کردن نوع تخفیف الزامی است'),
    amount: Yup.number('میزان تخفیف باید عددی باشد').required('وارد کردن  میزان تخفیف   الزامی است'),
    status: Yup.number('وضعیت تخفیف نا معتبر است'),
    start_date: Yup.number('تاریخ شروع باید عددی باشد').required('وارد کردن تاریخ شروع الزامی است'),
    end_date: Yup.number('تاریخ پایان باید عددی باشد').required('وارد کردن تاریخ پایان الزامی است'), 
    discount_ceiling:Yup.number('حداکثر درصد تخفیف باید از نوع عددی باشد.').required('وارد کردن حداکثر درصد تخفیف الزامی است'),
    user_id:Yup.number('نام کاربر نامعتبر است').nullable(),
    type: Yup.number(' مقدار نامعتبر می باشد '),
})

export default CopanSchema;