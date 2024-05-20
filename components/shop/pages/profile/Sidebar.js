import Image from "next/image";
import Link from "next/link";
import profile from '../../../../public/image/download.jpg'
import { useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";
 

const Sidebar = () => {
    const { logout} = useAuth();
 const {user} = useSelector(state=>state.auth);
   

    return (
        <>
            <section className="absolute -top-6 m-2 p-2 flex flex-col justify-center items-center">
                <Image src={user?.user.profile_photo_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.user.profile_photo_path}` : profile} unoptimized={true} width={'200'} height={'100'} className={'rounded-full w-32 h-32 object-cover shadow-lg shadow-pallete '} />
                <p className="text-pallete font-bold text-lg p-2 m-1">ملیکا اصلاحی</p>
            </section>
            <section className="flex flex-col justify-center mt-20 items-center w-full">
                <ul className="w-full  ">
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/profile'} className={' '}>   پروفایل </Link>
                    </li>
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/addresses'} className={' '}> آدرس های من </Link>
                    </li>
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/orders'} className={' '}>      سفارشات من </Link>
                    </li>
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/tickets'} className={' '}>      تیکت های من </Link>
                    </li>
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/favorites'} className={' '}>    علاقه مندی ها   </Link>
                    </li>
                    <li className="w-full p-3 mt-1 hover:text-pallete hover:bg-pallete hover:bg-opacity-20 rounded-lg ">
                        <Link href={'/profile/addresses'} className={'text-red-600'} onClick={()=>{logout()}}>      حروج از حساب </Link>
                    </li>
                </ul>

            </section>
        </>
    )
}
export default Sidebar;