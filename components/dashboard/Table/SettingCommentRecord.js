import Link from "next/link";
import { Button } from "../inputs";
import { usePathname } from "next/navigation";
import useToast from "@/hooks/useToast";

const SettingCommntRecord=({id , query , message=[]})=>{
    const pathname = usePathname();
  
    const [changeApproved, { data: dataApproved }] = query();
    const handlerApproved = async (id) => {
        await changeApproved(id);
    }

    useEffect(() => {
         useToast({dataStatus:dataApproved, customMessage:message});
    }, [dataApproved])
    return(
    <>
        <Link href={`${pathname}/show/${id}`}
         className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white"> 
          نمایش  
        </Link>
        <Button type="button"
         onClick={() => {handlerApproved(row.id)}} 
         className={`py-2 px-4 rounded text-white
          ${row.approved == 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}> 
          {row.approved == 1 ? "عدم تایید":"تایید"}   
        </Button>  
    </>)
}
export default SettingCommntRecord;