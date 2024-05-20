import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const CreateBrandSchema = Yup.object({
    persian_name: Yup.string().min(2, 'نام فارسی  برند باید بیشتر از 2 کارکتر باشد').max(100, 'نام   فارسی برند  باید  کمتر  از  100  کارکتر   باشد').required('نام    فارسی برند الزامی است'),
    original_name: Yup.string().min(2, 'نام اصلی برند باید بیشتر از 2 کارکتر باشد').max(100, 'نام    اصلی انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام اصلی برند الزامی است'),
    logo: Yup
    .mixed()
    .required("وارد کردن لوگو برند الزامی است")
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
    status: Yup.number(),
    tags: Yup.string().required('وارد کردن تگ ها الزامی است'),
})

export default CreateBrandSchema;