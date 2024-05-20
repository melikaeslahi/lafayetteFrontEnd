import * as Yup from 'yup';

 
const PermissionSchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام دسته بندی الزامی است'),
   
    description: Yup.string().min(2, ' توضیحات باید بیشتر از 2 کارکتر باشد').max(250, ' توضیحات باید  کمتر  از  100  کارکتر   باشد').required('توضیحات خود را وارد نمایید'),
    
})

export default PermissionSchema;