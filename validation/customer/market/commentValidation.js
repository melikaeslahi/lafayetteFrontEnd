import * as Yup from 'yup';

 
 
const CommentSchema = Yup.object().shape(
    {
        body: Yup.string().min(2, 'نظر شما باید بیشتر از 2 کارکتر باشد').max(100, ' نظر شما  باید  کمتر  از   400  کارکتر   باشد').required(' وارد کردن متن نظر الزامی است'),
      
    
    }
    )

export default CommentSchema;