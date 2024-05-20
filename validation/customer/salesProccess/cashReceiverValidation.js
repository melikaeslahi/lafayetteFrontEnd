import * as Yup from 'yup';

const cashReceiverSchema = Yup.object().shape(
    {
      cash_receiver: Yup.string('فرمت دریافت کددنه باید از نوع کرکتر باشد').nullable(),
  
      
    }
    )

    

export default cashReceiverSchema;