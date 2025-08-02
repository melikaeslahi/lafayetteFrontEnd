'use client';
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SettingRecord =({id ,title})=>{
    const pathname =  usePathname();
    const dispatch =  useDispatch();
    return(
        <>
       <Link 
          href={`${pathname}/edit/${id}`}
          className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">
          <FontAwesomeIcon icon={faEdit} />  
         </Link>
         <Button type="button" 
          onClick={() => {
             dispatch(setHandlerModal([title, id]))
                dispatch(modalOpenClose(true));
         }} 
          className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">
          <FontAwesomeIcon icon={faTrash} /> 
         </Button>
        </>
    );
}
export default SettingRecord;