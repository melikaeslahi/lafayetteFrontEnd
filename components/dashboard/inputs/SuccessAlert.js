'use client';
import { setSuccessMessage } from '@/store/reducers/dashboard/UtilSlice';
import { useEffect ,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
 

const  SuccessAlert = ({TimeDisable}) => {
    const {successMessage } = useSelector((state) => state.util);
     const dispatch= useDispatch();
    const [show, setShow] =  useState(true)
   
   
    useEffect(() => {
     if (!TimeDisable){
       const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
       dispatch(setSuccessMessage(''));
        setShow(false)
      }, 6000)
      return () => {
       
        clearTimeout(timeId)
      }
    }
       
      }, []);
    
      // If show is false the component will return null and stop here
      if (!show) {
        return null;
      }
    

    //server errors
    return (
         <>
         {successMessage ?
                        <section   className="flex items-center   p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 " >
                            <div>
                               <p className='text-green-700'>
                               {successMessage}</p> 
                            </div>
                        </section> : null}
         </>
    )
}
export default SuccessAlert;