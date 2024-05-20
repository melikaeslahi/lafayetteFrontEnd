import { faHomeAlt, faSearch, faShoppingCart, faSquareFull, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";

const MobileFooter =() =>{
    const { user } = useSelector(state=>state.auth);
    return(
<>
<footer className=" w-full   flex  flex-col  justify-center items-center bg-gray-50 ml-auto mr-auto  container">
                
                01
                <section  className="w-full z-50 p-2   rounded-lg  fixed bottom-0 flex  justify-between items-center shadow-inner    bg-white ">
                   <section className="m-2">
                       <Link href={'/'}> <FontAwesomeIcon icon={faHomeAlt} /> </Link>
                   </section>
                   <section className="m-2">
                       <Link href={'/'}> <FontAwesomeIcon icon={faSearch} /> </Link>
                   </section>
                   <section className="m-2">
                       <Link href={'/'}> <FontAwesomeIcon icon={faShoppingCart} /> </Link>
                   </section>
   
                   <section className="m-2">
                       <Link href={'/'}> <FontAwesomeIcon icon={faSquareFull} /> </Link>
                   </section>
                   <section className="m-2">
                   { user ?  <Link href={'/profile/profile'}> <FontAwesomeIcon icon={faUser} /> </Link>   : <Link   href={'/login&register'}   > <FontAwesomeIcon icon={faUser} />  </Link> }
                    
                   </section>
                </section>
   
   
         
           </footer>
</>
    )
}
export default MobileFooter;