import * as Yup from 'yup';



const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const CreateGallerySchema = Yup.object().shape({
    
    image: Yup.mixed().when("image", {
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
    
  
} , ['image' , 'image'])

export default CreateGallerySchema;