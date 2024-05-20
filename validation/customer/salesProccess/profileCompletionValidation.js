import * as Yup from 'yup';


const phoneRegExp = /^(\+98|98|0)9\d{9}$/;
const ProfileCompletionSchema = Yup.object().shape(
    {
        first_name: Yup.string().min(2, 'نام     باید بیشتر از 2 کارکتر باشد').max(100, 'نام باید  کمتر  از  100  کارکتر   باشد').nullable(),
        last_name: Yup.string().min(2, 'نام خانوادگی    باید بیشتر از 2 کارکتر باشد').max(100, 'نام خانوادگی باید  کمتر  از  100  کارکتر   باشد').nullable(),

        email: Yup
            .string()
            .email(" فرمت ایمیل نامعتبر است ").nullable(),

        //.test("is-valid", (message) => `${message.path}  معتبر است  `, (value) => value ? isEmailValidator(value) : new  Yup.ValidationError("  معتبر نسیت  ")),


        mobile: Yup.string().matches(phoneRegExp, ' شماره موبایل معتبر نیست').nullable(),
        national_code: Yup.number().nullable()

    })

export default ProfileCompletionSchema;