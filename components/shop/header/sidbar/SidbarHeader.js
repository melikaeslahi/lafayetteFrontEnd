import Image from "next/image";
import logo from '../../../../public/image/logoOne.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
const SidebarHeader = () => {
    const dispatch =   useDispatch();
    return(
        <>
         <section className={'w-full fixed top-4 left-4 right-4 bg-transparent'}>

<FontAwesomeIcon
    className="flex justify-end items-center w-full hover:text-pallete hover:cursor-pointer"
    icon={faClose}
    onClick={() => dispatch(setSidebarOpen(false))} />

</section>

<section className="flex justify-center items-center bg-white pb-5 border-b-2 ">

<Image src={logo} width={100} height={100} className="w-36 h-36 rounded-full p-1 shadow shadow-pallete" />

</section>
        </>
    )
}
export default SidebarHeader;