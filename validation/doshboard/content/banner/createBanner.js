import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
 
const CreateBannerSchema = Yup.object({
    title: Yup.string().min(2, 'عنوان انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'عنوان انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('     عنوان بنر الزامی است'),
     url: Yup.string().required('وارد کردن ٖینک برای بنر الزامی است'),
    image: Yup
    .mixed()
    .required("you need to provide a file")
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
   position:Yup.number(),
    status: Yup.number(),
   
})

export default CreateBannerSchema;