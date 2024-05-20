import * as Yup from 'yup';


const ConfirmSchema = Yup.object({
     otp: Yup.string().required('وارد کردن     کد تایید    الزامی است'),
   
})

export default ConfirmSchema;