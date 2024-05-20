import * as Yup from 'yup';


const copanSchema = Yup.object().shape(
    {
     
      copan: Yup.string('فرمت کد تخفیف باید رشته باشد').nullable(),
      
    }
    )

    

export default copanSchema;