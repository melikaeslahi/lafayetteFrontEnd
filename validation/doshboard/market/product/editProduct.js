import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const EditProductSchema = Yup.object().shape( {
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام دسته بندی الزامی است'),
    parent_id:  Yup.number().nullable(),
    image:   Yup.mixed().when("image", {
        is: (value) => value?.length,
        then: (schema) =>
            schema
            .test("filesize", "حجم تصویر زیاد است",  value => !value || (value && value.size <= FILE_SIZE))
            .test("type", "پسوند های معتبر:  .jpeg, .jpg , .png , .svg , .gif", (value) => {
                return value && (
                    value.type === "image/jpeg" ||
                    value.type === "image/jpg" ||
                    value.type === "image/png" ||
                    value.type === 'image/svg' ||
                    value.type === "image/gif"
                );
            }),
        otherwise: (schema) => schema.nullable(),
    }),

    description: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(250, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('توضیحات خود را وارد نمایید'),
    status: Yup.number(),
    tags: Yup.string().required('وارد کردن تگ ها الزامی است'),
},['image' , 'image'])

export default EditProductSchema;