import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const SliderSchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام    اسلایدر الزامی است'),
    parent_id: Yup.number().nullable(),
    status: Yup.number(),
 
})

export default SliderSchema;