import * as Yup from 'yup';

 
const RoleSchema = Yup.object({
     roles: Yup.array().required('وارد کردن   نقش ها الزامی است'),   
 
})

export default RoleSchema;