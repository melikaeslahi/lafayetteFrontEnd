import * as Yup from 'yup';

 
const PermissionSchema = Yup.object({
    permissions: Yup.array().required('وارد کردن  دسترسی ها الزامی است'),   
 
})

export default PermissionSchema;