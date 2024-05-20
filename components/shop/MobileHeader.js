 
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import logo from '../../public/image/Untitled.jpg';
 
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./header/sidbar/Sidbar";
import { setIsCartItemModal, setSidebarOpen } from "@/store/reducers/dashboard/UtilSlice";
import { useEffect } from "react";
 
const MobileHeader = () => {
    const {isSidebarOpen} =  useSelector(state => state.util);
    const dispatch = useDispatch();
   

    return (
        <>
            <header className="w-full z-50">
                <section className="flex      flex-col  bg-white w-full p-3    h-12  justify-between items-center z-50  fixed top-0 shadow-lg">
                    <section className="flex  flex-col justify-between items-center w-full fixed top-0  ">

                        <section className="flex justify-between items-center w-full m-3">
                             <button type=""
                              onClick={()=>{dispatch(setSidebarOpen(!isSidebarOpen))}} 
                              >
                            <FontAwesomeIcon
                             className="text-lg p-1 pr-3"
                             icon={faBars} 
                             />
                             </button>
                          
                            <Image className="" alt="logo" src={logo} width='200' height={'80'} />
                        </section>
        
                    </section>

                   {isSidebarOpen ? <Sidebar /> : null} 
                </section>

            </header></>
    )
}
export default MobileHeader;