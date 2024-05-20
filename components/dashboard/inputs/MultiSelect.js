'use client'
 
import InputFrame from "./InputFrame";
 
import { useEffect, useState } from "react";
import Input from "./Input";
import ReactSelect from "react-select";
 
 
 
 






const MultipleSelect = ({ name, type,   title, options , className, defaultValue ,placeholder }) => {
    const [selected, setSelected] =  useState(defaultValue ? defaultValue: []);
    const [fieldSelected , setFieldSelected ] =useState([]);
    
    useEffect(()=>{
        setFieldSelected(selected)  
    } , [selected])
    console.log(selected)
    return (<>
               <Input type={type} title={title}  containerClass={'w-full'} name={name} className={'w-52 basis-full'} >
                      
                      {({field , form })=>{
                        
                        return(
                        <ReactSelect
                        className="w-86"
                        placeholder={placeholder}         
                        options={options} 
                        defaultValue={defaultValue}
                        isMulti
                        onChange={setSelected} 
                        onBlur={()=>{
                        
                        const  valueSelected=  fieldSelected.map((field)=>{
                                   
                                   return  field.value
                              })
                         
                              form.setFieldValue(field.name ,  valueSelected  ) ;
                          }}  />
                       
                            )
                        
                      }}

               </Input>
    </>)
}
export default MultipleSelect;