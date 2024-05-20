import * as Yup from 'yup';

 

 
const EditSettingSchema = Yup.object().shape( 
    {
        title: Yup.string().min(2, ' عنوان انتخاب شده باید بیشتر از 2 کارکتر باشد').max(100, 'عنوان انتخاب شده باید  کمتر  از  100  کارکتر   باشد').required(' عنوان تنضیمات الزامی است'),
        parent_id:  Yup.number().nullable(),
        logo:   Yup.mixed().when("logo", {
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
    
    
         icon:  Yup.mixed().when("icon", {
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
    
        keywords: Yup.string().min(2, '     کلمات کلیدی باید بیشتر از 2 کارکتر باشد').max( 125, '     کلمات کلیدی باید  کمتر  از  125  کارکتر   باشد').required('کلمات کلیدی   را وارد نمایید'),
        description: Yup.string().min(2, '     توضیحات باید بیشتر از 2 کارکتر باشد').max(250, ' توضیحات       باید  کمتر  از  250  کارکتر   باشد').required('    وارد کردن توضیحات  الزامی است' ),
         
    }
    , [['logo' , 'logo'] , ['icon' , 'icin']])

export default EditSettingSchema;