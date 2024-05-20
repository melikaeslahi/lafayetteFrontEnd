import * as Yup from 'yup';


const EditStoreSchema = Yup.object({
    marketable_number: Yup.number('مقدار محصول قابل فروش باید از نوع عددی باشد').required('وارد کردن تعداد محصول قابل فروش الزامی است'),
    sold_number: Yup.number('مقدار محصول   فروخته شده  باید از نوع عددی باشد').required('وارد کردن تعداد محصول فروخته شده الزامی است'),
    frozen_number: Yup.number('مقدار محصول    رزورو    باید از نوع عددی باشد').required('وارد کردن تعداد محصول رزرو شده الزامی است'),


})

export default EditStoreSchema;