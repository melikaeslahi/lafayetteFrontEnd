import { toast } from "react-toastify"

const useToast=({dataStatus=null , result=null ,  message=null , customMessage=null})=>{
   const successCheckTrueToast =(message , customMessage)=>{
             toast.success(`${customMessage ?? `${message}  با موفقیت  فعال شد `} `,
              {
             position: toast.POSITION.TOP_LEFT,
             rtl: true
        })
    }
    const successCheckFalseToast =(message)=>{
             toast.success(`${customMessage  ?? `${message}  با موفقیت غیر فعال شد `} `,
              {
               position: toast.POSITION.TOP_LEFT,
               rtl: true
                })
      }
   const errorToast =()=>{
            toast.error('خطایی پیش آمده است ', {
            position: toast.POSITION.TOP_LEFT,
            rtl: true
        })
        }
    const successDelete=(message)=>{
        toast.success(`${message}   با موفقیت حذف شد.`, {
            position: toast.POSITION.TOP_LEFT,
            rtl: true
        });
    }

     // show a toast when we change the checkbox in list for enable or disable an item in list
     if (dataStatus === null || dataStatus=== undefined) return;
     if (dataStatus) {
        if (dataStatus.status === true && dataStatus.checked === true) {
            successCheckTrueToast(message ,customMessage);
        } else if (dataStatus.status === true && dataStatus.checked === false) {
            successCheckFalseToast(message , customMessage);               
        } else if (dataStatus.status === false) {
            errorToast();
        }
        }  

    //show a toast when we delete an item from database
    if(result===null || result=== undefined) return;
    if (result.data) {
        if (result.data.status === 200) {
            successDelete(message);  
        }else{
            errorToast();
        }
    }
}

export default useToast;