const CustomTable=({children, className, headers})=>{
    return(
        <>
         <table className={`${className} w-full font-lotus overflow-x-scroll dark:text-gray-100 text-black p-3 shadow-lg`}>
            <thead className="text-pallete shadow-md">
                <tr className={`text-center`}>
                    <th className="pl-3 py-3">#</th>
                    {headers?.map((header)=>
                    <th key={header} 
                     className="pl-3 py-3"
                    >{header}</th>
                    )}
                    <th className="pl-3 py-3">تنظیمات</th>
                </tr>
            </thead>
             <tbody>
                {children}
             </tbody>
         </table>
        </>
    );
}
export default CustomTable;