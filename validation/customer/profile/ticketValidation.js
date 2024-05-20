import * as Yup from 'yup';

 

const FILE_SIZE = 5 * 1024 * 1024;
 
const TicketStoreSchema = Yup.object().shape(
    {
        description: Yup.string().min(2, ' توضیحات باید بیشتر از 2 کارکتر باشد').max( 500, ' توضیحات باید  کمتر  از   500  کارکتر   باشد').required(' توضیحات الزامی است'),
         title: Yup.string().min(2, ' عنوان      باید بیشتر از 2 کارکتر باشد').max(100, ' عنوان   باید  کمتر  از  100  کارکتر   باشد').required(' عنوان  الزامی است'),
         file:  Yup.mixed().when("file", {
            is: (value) => value?.length,
            then: (schema) =>
                schema
                .test("filesize", "حجم تصویر زیاد است",  value => !value || (value && value.size <= FILE_SIZE))
                .test("type", "پسوند های معتبر:  .jpeg, .jpg , .png , .svg , .gif", (value) => {
                    return value && (
                        value.type === "image/jpeg" ||
                        value.type === "image/jpg" ||
                        value.type === "image/png" ||
                        value.type === 'image/svg' ||
                        value.type === "image/gif"
                    );
                }),
            otherwise: (schema) => schema.nullable(),
        }),
 
        
        priority_id: Yup.number(),
          category_id: Yup.number(),

    
    }
    , ['file' , 'file'])

export default TicketStoreSchema;