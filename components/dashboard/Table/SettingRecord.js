'use client';
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Modal from "../Modal";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
 

const SettingRecord =({id ,title , query , message})=>{
    const {isOpenModal,  deleteID, deleteName } =  useSelector((state) => state.util);
    const [deleteRecord, result] = query();
    const pathname =  usePathname();
    const dispatch =  useDispatch();

    const handlerDelete = async (id) => {
        dispatch(modalOpenClose(false));
        await deleteRecord(id);
    }  
    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        useToast({result:result , message:message})
    }, [result]);
    return(
        <>
         {isOpenModal ? <Modal name={deleteName}  >
                <button className="bg-clifford text-pallete border rounded-lg border-pallete px-4 py-1 m-2" onClick={() => handlerDelete(deleteID)}> حذف </button>
            </Modal> : null}
         
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