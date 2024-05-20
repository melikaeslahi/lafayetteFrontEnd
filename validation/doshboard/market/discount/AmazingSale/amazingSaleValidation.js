import * as Yup from 'yup';

 

 
 
const AmazingSaleSchema = Yup.object({
    percentage: Yup.number('درصد تخفیف باید از نوع عددی باشد').min(1, 'حداقل درصد تخفیف 1 می باشد ').max(100, ' حداکثر درصد تخفیف 100 می باشد').required(' وارد کردن درصد تخفیف الزامی است'),
    product_id: Yup.number('فرمت محصول اشتباه است').nullable(),
    start_date: Yup.number('تاریخ شروع باید عددی باشد').required('وارد کردن تاریخ شروع الزامی است'),
    end_date: Yup.number('تاریخ پایان باید عددی باشد').required('وارد کردن تاریخ پایان الزامی است'),
    status: Yup.number('مقدار وضعیت نامعتبر است.'),
     
})

export default AmazingSaleSchema;