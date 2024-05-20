import * as Yup from 'yup';

 

 
 
const CreateStoreSchema = Yup.object({
    receiver: Yup.string().min(2, 'نام   گیرنده  باید بیشتر از 2 کارکتر باشد').max(100, 'نام   گیرنده  باید  کمتر  از  100  کارکتر   باشد').required('نام  گیرنده   الزامی است'),
    deliverer: Yup.string().min(2, 'نام   تحویل دهنده  باید بیشتر از 2 کارکتر باشد').max(100, 'نام      تحویل دهنده  کمتر  از  100  کارکتر   باشد').required('نام   تحویل دهنده  الزامی است'),
    description: Yup.string().min(2, '     توضیحات باید بیشتر از 2 کارکتر باشد').max(250, '     توضیحات باید  کمتر  از  100  کارکتر   باشد').required('توضیحات خود را وارد نمایید'),
    marketable_number: Yup.number('مقدار محصول قابل فروش باید از نوع عددی باشد'),
   
})

export default CreateStoreSchema;