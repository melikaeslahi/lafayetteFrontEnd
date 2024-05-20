import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
 
const TicketAnswerSchema = Yup.object().shape(
    {
        description: Yup.string().min(2, ' توضیحات باید بیشتر از 2 کارکتر باشد').max( 500, ' توضیحات باید  کمتر  از   500  کارکتر   باشد').required(' توضیحات الزامی است'),
        

    
    }
    , )

export default TicketAnswerSchema;