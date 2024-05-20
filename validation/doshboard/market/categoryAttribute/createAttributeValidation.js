import * as Yup from 'yup';


const CreateAttributeSchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(120, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام دسته بندی الزامی است'),
    category_id: Yup.number().required('وارد کردن دسته بندی الزامی است'),
    unit: Yup.string().min(2, ' واحد اندازه گیری     باید بیشتر از 2 کارکتر باشد').max(120, '     واحد اندازه گیری باید  کمتر  از  100  کارکتر   باشد').required('نام دسته بندی الزامی است'),
     

   
})

export default CreateAttributeSchema;