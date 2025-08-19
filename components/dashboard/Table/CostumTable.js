'use client'
import { usePathname } from "next/navigation";
import {TableHeader , TableContainer} from "./index";
import { useSelector } from "react-redux";

const CustomTable=({title ,href,sitemap , className,  columns, query ,deleteRecord })=>{
    const pathname = usePathname();
    const { page, perPage, search } =  useSelector((state) => state.util);
    const data = query({ page, perPage, search });
   const style="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete w-full border-b-2 border-pallete";

    return(
        <>
        <TableHeader 
          title={title} 
          href={href?href:`${pathname}/create`}  
          sitemap={sitemap}/>

        <TableContainer
            pagination={data?.meta}
            deleteRecord={deleteRecord}
            query={data}
        >     
         <table className={`${className} w-full font-lotus overflow-x-scroll dark:text-gray-100 text-black p-3 shadow-lg`}>
            <thead className="text-pallete shadow-md">
                <tr className={`text-center`}>
                    <th className="pl-3 py-3">#</th>
                    {columns?.map((col)=>
                    <th key={col.key} 
                     className="pl-3 py-3"
                    >{col.label}</th>
                    )}
                    
                </tr>
            </thead>
             <tbody>
                {data.data?.data?.map((row) => (
                   <tr key={row.id} className={style}>
                    <td className="pl-3 py-3">{row.id}</td>
                     {columns.map((col)=>(
                      <td className="pl-3 py-3">
                        {col.render ? col.render(row[col.key],row):row[col.key]}
                      </td>
                       )   
                     )}   
                    </tr>
                ))}
             </tbody>
         </table>
         </TableContainer>
        </>
    );
}
export default CustomTable;