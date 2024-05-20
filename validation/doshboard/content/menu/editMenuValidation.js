import * as Yup from 'yup';


 
const EditMenuSchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام   منو  الزامی است'),
    parent_id:  Yup.number().nullable(),
    
    status: Yup.number(),
    url: Yup.string().required('وارد کردن آدرس الزامی است'),
})

export default EditMenuSchema;