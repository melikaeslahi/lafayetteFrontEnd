import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const EditBannerSchema = Yup.object().shape( {
    title: Yup.string().min(2, 'عنوان انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'عنوان انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('     عنوان بنر الزامی است'),
    url: Yup.string().required('وارد کردن ٖینک برای بنر الزامی است'),
   image:  Yup.mixed().when("image", {
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
  position:Yup.number(),
   status: Yup.number(),
} , ['image' , 'image'])

export default EditBannerSchema;