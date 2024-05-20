import * as Yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const EditPostSchema = Yup.object().shape({
  title: Yup.string().min(2, ' عنوان انتخاب شده باید  حداقل   2 کارکتر باشد').max(100, ' عنوان انتخاب شده باید    حداکثر   100  کارکتر   باشد').required(' عنوان  پست  الزامی است'),
  category_id: Yup.number().required('انتخاب دسته الزامی است'),
  image: Yup.mixed().when("image", {
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

  body: Yup.string().min(2,  ' متن پست باید  حداقل  2  کارکتر   باشد').max(250, ' متن پست باید حداکثر 1000  کارکتر   باشد').required(' متن خود را وارد نمایید'),
  status: Yup.number().required('انتخاب وضعیت برای پست الزامی می باشد'),
  commentable: Yup.number().required('انتخاب  امکان کامنت گذاری برای  پست الزامی می باشد'),
  summary: Yup.string().min(2,  '  خلاصه پست باید  حداقل  2  کارکتر   باشد').max(250, '  خلاصه پست باید حداکثر  300  کارکتر   باشد').required(' متن خود را وارد نمایید'),

  tags: Yup.string().required('وارد کردن تگ ها الزامی است'),
} , ['image' , 'image'])
 

export default EditPostSchema;