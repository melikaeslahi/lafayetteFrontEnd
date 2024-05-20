import * as Yup from 'yup';


 
const CreatePageSchema = Yup.object({
    title: Yup.string().min(2, 'عنوان انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'عنوان انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('   عنوان صفحه   الزامی است'),
    body: Yup.string().min(2, ' بدنه انتخاب شده باید بیشتر از 2 کارکتر باشد').max( 700, ' بدنه انتخاب شده باید  کمتر  از  700  کارکتر   باشد').required(' بدنه  صفحه را وارد نمایید'),
    status: Yup.number(),
    tags: Yup.string().required('وارد کردن تگ ها الزامی است'),
})

export default CreatePageSchema;