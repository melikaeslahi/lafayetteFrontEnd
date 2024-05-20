import { useEffect, useState } from "react";
import { DatePicker, TimePicker } from "zaman";
import Input from "./Input";

const JalaliDate = ({ name, placeHolder, title, defTime }) => {
   const [hours , setHour] = useState();
   const [minute , setMinutes] = useState();
 

   const timeStamp =(value)=>{
    var d = new Date(value)
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var hour =hours? ("0" +  hours).slice(-2) : ("0" + d.getHours()).slice(-2)
    var minutes = minute ? ("0" + minute ).slice(-2):("0" + d.getMinutes()).slice(-2)
    var seconds = ("0" + d.getSeconds()).slice(-2);
    var time = year + "-" + month + "-" + day + " "+ hour + ":" + minutes + ":" + seconds;
  
    const newInputDate = time.replace(" ", "T");
    const timeStamp = new Date(newInputDate).getTime();
    return timeStamp;
   }
 
   
//    console.log(timeStamp(defTime) )
  const handlerChange =( form , field   ,value  ) =>{
   
      const time = timeStamp(value);
        form.setFieldValue(field.name,   time)  
        console.log(form)
  }

    return (
        <Input name={name} placeholder={placeHolder} title={title} >
            {({ field, form }) => {
                return (
                    <>
                        <DatePicker
                            defaultValue={defTime ? timeStamp(defTime) : new Date()}
                            round='x4'
                             
                            inputAttributes={{
                                placeholder: { placeHolder },
                                // disabled :   hours && minute ? false : true
                            }}
                            className={'text-black'}
                            show={true}                            
                            inputClass={'shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete '}
                            accentColor={'d08a85'} onChange={(e) => {  handlerChange(form , field , e.value)
 
                            } }      
                             />
       
                        <TimePicker
                        defaultValue={defTime ?  timeStamp(defTime): new Date()}
                        inputClass={'p-2 shadow-lg appearance-none dark:text-gray-100  dark:bg-zinc-600 rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none    focus:border-pallete '}
                            onChange={(e) => {
                                setHour(e.hour);
                                setMinutes(e.minute)}  }
                        />
                    </>
                )
            }}

        </Input>
    )
}
export default JalaliDate;