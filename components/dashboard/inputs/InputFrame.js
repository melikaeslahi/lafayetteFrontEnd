import { ErrorMessage   } from 'formik'
import Label from './Label'

const InputFrame = ({ name, title  ,children , containerClass  }) => {
  
    return (
        <section
            className={`${containerClass}  mb-6 basis-full lg:basis-1/2  w-full xl:basis-1/2 md:basis-full `}> 

            <Label
                htmlFor={name}>
                {' '}
                {title}{' '}
            </Label>
             
              {children}
                
            <section className="text-red-500 text-sm">
                <ErrorMessage name={name} />
            </section>
        </section>
    )
}


export default InputFrame;


 