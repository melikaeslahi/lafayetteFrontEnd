import * as Yup from 'yup';

 

 
 
const LoginRegisterSchema = Yup.object({
     id: Yup.string().required('وارد کردن ایمیل یا شماره موبایل الزامی است'),
   
})

export default LoginRegisterSchema;