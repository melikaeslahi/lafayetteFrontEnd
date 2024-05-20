import { Field } from "formik";
 
import InputFrame from "./InputFrame";

const Input = ({children , type , name ,title ,placeholder ,select , className ,containerClass ,value }) =>{
    return(<>
      <InputFrame name={name} title={title} containerClass={containerClass}>
                                    <Field
                                       as={select}
                                        type={type}
                                        id={name}
                                        name={name}
                                        value={value}
                                        placeholder={placeholder}
                                        className={`${className} shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete `}
                                    >
                                        {children}
                                    </Field>

                                </InputFrame>
    </>)
}
export default Input;