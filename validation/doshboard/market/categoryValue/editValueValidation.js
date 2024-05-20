import * as Yup from 'yup';

 

const EditValueSchema = Yup.object({
  value: Yup.string().min(2, ' مقدار باید بیشتر از 2 کارکتر باشد').max(100, ' مقدار باید  کمتر  از  100  کارکتر   باشد').required('وارد کردن مقدار الزامی است'),
    product_id: Yup.number('محصول انتخاب شده نا معتبر می باشد').required('وارد کردن نام محصول الزامی است'),
    price_increase: Yup.number('قیمت وارد شده نامعتبر می باشد').nullable(),
    type: Yup.number('مقدار تایپ نا معتبر می باشد').required('وارد کردن تایپ     الزامی است'),
})

export default EditValueSchema;