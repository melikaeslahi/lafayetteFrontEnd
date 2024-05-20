import * as Yup from 'yup';


const CreateProductColorSchema = Yup.object({
    color_name: Yup.string().min(2, 'نام رنگ انتخاب شده باید بیشتر از 2 کارکتر باشد').max(120, 'نام رنگ انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام رنگ الزامی است'),
    color: Yup.string().min(2, 'کد رنگ انتخاب شده باید بیشتر از 2 کارکتر باشد').max(120, 'کد رنگ انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام رنگ الزامی است'), 
    price_increase: Yup.number('فرمت افزایش قیمت باید عددی باشد').nullable(),

})

export default CreateProductColorSchema;