import * as Yup from 'yup';

 
 
const EmailSchema = Yup.object({
    subject: Yup.string().min(2, ' موضوع انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, ' موضوع انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('   وارد کردن موضوع   الزامی است'),
    body: Yup.string().min(2, ' توضیحات باید بیشتر از 2 کارکتر باشد').max(250, '   توضیحات   باید  کمتر  از  250  کارکتر   باشد').required('توضیحات خود را وارد نمایید'),
    status: Yup.number(),
    published_at: Yup.number(),
})

export default EmailSchema;