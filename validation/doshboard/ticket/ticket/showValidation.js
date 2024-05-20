import * as Yup from 'yup';

 
 
 
const ShowTicketSchema = Yup.object({
  description: Yup.string().min(2, 'نام انتخاب شده باید بیشتر از 2 کارکتر باشد').max(250, 'نام انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required('توضیحات خود را وارد نمایید'),  
})

export default ShowTicketSchema;