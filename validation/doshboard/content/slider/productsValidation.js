import * as Yup from 'yup';

 

 
  
const ProductSliderSchema = Yup.object({
   products: Yup.array().required('وارد کردن  محصولات الزامی است'),   
    
})

export default ProductSliderSchema;