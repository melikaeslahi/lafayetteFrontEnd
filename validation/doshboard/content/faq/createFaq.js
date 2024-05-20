import * as Yup from 'yup';

 
 
const CreateFaqSchema = Yup.object({
     question: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('وارد کردن سوال الزامی است'),
     answer: Yup.string().min(2, '     پاسخ واردشده باید بیشتر از 2 کارکتر باشد').max(500, '     پاسخ وارد شده باید  کمتر  از  500  کارکتر   باشد').required(' پاسخ خود را وارد نمایید'),
    status: Yup.number(),
    tag: Yup.string().required('وارد کردن تگ ها الزامی است'),
})

export default CreateFaqSchema;