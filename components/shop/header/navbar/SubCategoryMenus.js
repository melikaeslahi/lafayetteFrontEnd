import Link from "next/link";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SubCategoryMenus = ({ subCategories }) => {
 

   return (<>
      {subCategories?.map(({name , id ,children})=>(

<li key={id} className="w-full flex flex-col justify-between items-center ">
<section className="flex  justify-between items-center w-full">
<Link href="/" className={` ${children?.length  > 0  ? 'text-black font-bold' : 'text-gray-300' }    hover:text-pallete py-1`}> {name} </Link>

<FontAwesomeIcon className={`${children?.length > 0 ? 'flex' : 'invisible'}`} icon={faAngleDown} />  
</section>  

{children.length > 0 ?<>
  <ul className="flex flex-col  w-full justify-between items-start ">
  <SubCategoryMenus subCategories={children} /> 
  </ul>





</>
: null 
}

</li>

      //  <li key={id} className="flex justify-between items-center w-full">
      //      <section className="flex  justify-between items-center w-full">
      //        <Link href="/" className={` ${ children?.length  > 0  ? 'text-black font-bold' : 'text-gray-300' }    hover:text-pallete py-1`}> {name} </Link>
             
      //       <FontAwesomeIcon className={`${ children?.length > 0 ? 'visible' : 'invisible'}`} icon={faAngleDown} />  
      //        </section> 


      //   {children?.length > 0 ? 
      //    <ul className="flex flex-col   justify-between items-start w-full">
         

      //    {children?.length > 0 ? children.map((child, index) =>{
            
            
      //       return(<li key={index} className="flex flex-col   justify-between items-center">
      //        <section className="flex  justify-between items-center w-full">
      //        <Link href="/" className={` ${child?.children?.length  > 0  ? 'text-black font-bold' : 'text-gray-300' }    hover:text-pallete py-1`}> {child?.name} </Link>
             
      //       <FontAwesomeIcon className={`${child.children?.length > 0 ? 'flex' : 'invisible'}`} icon={faAngleDown} />  
      //        </section>  
           
      //       {child.children.length > 0 ?<>
      //          <ul className="flex flex-col justify-between items-start w-full">
      //          <SubCategoryMenus SubCategories={child.children} /> 
      //          </ul>   

      //       </>
      //       : null 
      //       }

      //    </li>)}) : null}

      // </ul>
      //   : null}
        
      //  </li>
 
      ))}

     </>)
}
export default SubCategoryMenus;