import Image from "next/image";
import { useSelector } from "react-redux";
import defaultProfile from '../../public/image/download.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { convertEnglishToPersian } from "@/helper/helper";
const ProfileDropDown =() =>{
const {user} = useSelector(state=>state.auth);

const {logout} = useAuth();
const [openProfile , setOpenProfile] = useState(false);
    return (
        <>
        {user ? <section className="flex justify-between items-center">
            <section className="p-1 rounded-full">
                <Image src={user.user.profile_photo_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.user.profile_photo_path}` : defaultProfile } unoptimized={true} alt="user profile" width={'25'} height={'25'} className={'rounded-full'} />
            </section>
            <section className="p-1">
                <p> {user.user.first_name && user.user.last_name ? user.user.first_name + ' ' + user.user.last_name : user.user.mobile  ? convertEnglishToPersian(user.user.mobile) : user.user.email } </p>
            </section>
            <section className="p-1">
                <FontAwesomeIcon onClick={()=> setOpenProfile(!openProfile)} className="hover:cursor-pointer" icon={openProfile ?  faAngleDown :faAngleUp} />
            </section>
            
         
         </section> : null }

         {
                openProfile ? 
           <section className="absolute z-50  bg-white dark:bg-zinc-800 border border-pallete rounded-lg flex flex-col items-start justify-center">
                <ul className="list-disc font-lotus w-full">
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link  href={'/profile/profile'}> ویرایش حساب </Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link  href={'/profile/favorites'}>  علاقه مندی ها </Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link  href={'/profile/orders'}> تاریخچه سفارشات </Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link  href={'/profile/tickets'}>    تیکت های من </Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link  href={'/profile/addresses'}>   آدرس های من  </Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-pallete"> 
                        <Link className="text-red-500" href={'/profile/profile'} onClick={()=>logout()} >    خروج از حساب   </Link>
                    </li>
                </ul>
                
            </section> : null
             } 
         
        </>
    )
}
export default ProfileDropDown;