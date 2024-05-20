import * as Yup from 'yup';

 

 
const TicketCategorySchema = Yup.object({
    name: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('نام دسته بندی الزامی است'),  
    status: Yup.number(),
    
})

export default TicketCategorySchema;