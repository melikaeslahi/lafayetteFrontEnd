'use client'
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import Input from "./Input";

const InputTags = ({name , editTags ,placeHolder ,title })=>{
    const [tags, setTags] =  useState( editTags ? editTags.split(',') : []);
    return(<>
     <div className="tags-input">
                                    <Input name={name} placeholder={placeHolder} title={title}>
                                        {({ field, form }) => {
                                            return (
                                                <>
                                                    <div>
                                                        <TagsInput
                                                            value={tags}
                                                            name='tags'
                                                            placeHolder={placeHolder}
                                                            onChange={setTags}
                                                            onBlur={() => {

                                                                form.setFieldValue(field.name, tags.toString())

                                                            }}
                                                            classNames={{input:'shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete ' , div:'shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete '}}
                                                            
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }}
                                  
                                  </Input>
                                </div>
    </>)
}
export default InputTags