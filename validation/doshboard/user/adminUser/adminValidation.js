import * as Yup from 'yup';

// .test("is-valid", (message) => `${message.path}  معتبر است  `, (value) => value ? isEmailValidator(value) : new  Yup.ValidationError("  معتبر نسیت  "))

const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
    ];
  const phoneRegExp = /^(\+98|98|0)9\d{9}$/;
const AdminSchema = Yup.object().shape( 
  {
    first_name: Yup.string().min(2, 'نام     باید بیشتر از 2 کارکتر باشد').max(100, 'نام باید  کمتر  از  100  کارکتر   باشد').required('نام     الزامی است'),
    last_name: Yup.string().min(2, 'نام خانوادگی    باید بیشتر از 2 کارکتر باشد').max(100, 'نام خانوادگی باید  کمتر  از  100  کارکتر   باشد').required('نام  خانوادگی   الزامی است'),

    email:  Yup
    .string()      
    .email(" فرمت ایمیلنامعتبر است ")
    .required("  وارد کردن ایمیل الزامی است  ")
    ,
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
    password: Yup.string().required('   وارد کردن رمز الزامی است  ') .min(8, 'رمز عبور کوتاه است -رمز عبور باید حداقل 8 حرف باشد')
    .matches(/[a-zA-Z]/, 'رمز عبور فقط می تواند شامل حروف لاتین باشد'),
    password_confirmation: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     mobile: Yup.string().matches(phoneRegExp, ' شماره موبایل معتبر نیست'),
    
    status: Yup.number(),
    activation: Yup.number(),

 
}
  ,['image' , 'image'])

export default AdminSchema;