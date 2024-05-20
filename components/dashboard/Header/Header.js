'use client';

import { drawerOpneClose } from "@/store/reducers/dashboard/UtilSlice";
import { faBars, faBell, faMessage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderIconsHover from "./HeaderIconsHover";

const Header = () => {

    const [message, setMessage] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const dispatch = useDispatch();
    const { openDrawer } = useSelector((state) => state.util);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }

    return (
        <>
            <header
                className={`flex  justify-start items-center z-10 p-3 h-14  ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${openDrawer ? 'xl:w-screen' : 'xl:w-4/5'}  w-screen  md:w-screen bg-pallete backdrop-blur-lg bg-opacity-20 rounded-full drop-shadow-xl fixed top-3 left-0`}>
                <section className="flex justify-center items-center account w-6 h-6 rounded-full  m-2 p-2">

                    <FontAwesomeIcon onClick={() => dispatch(drawerOpneClose(!openDrawer))} icon={faBars} className='cursor-pointer w-10 h-10 text-2xl text-pallete flex flex-col justify-center items-center' />


                </section>


                <section className="account flex justify-start items-center  rounded-full ">
                    <section
                        className="flex justify-center items-center account w-10 h-10 rounded-full bg-pallete   m-2 p-2">

                        {/* <img className="w-10 h-10 rounded-full" src="assets/image/profile.jpg" alt="imageprofile" /> */}
                        <h1 className="text-center"> ME </h1>

                    </section>
                    <section className="flex justify-center items-center account w-10 h-10 rounded-full   m-2 p-2">
                        {theme === 'dark' ?
                            <FontAwesomeIcon
                                icon={faSun}
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                className='cursor-pointer w-10 h-10 text-2xl text-pallete flex flex-col justify-center items-center' /> :
                            <FontAwesomeIcon
                                icon={faMoon}
                                onClick={() =>
                                    setTheme(theme === "dark" ? "light" : "dark")}
                                className='cursor-pointer w-10 h-10 text-2xl text-pallete flex flex-col justify-center items-center' />}

                    </section>


                    <section className="relative  flex justify-center items-center account w-6 h-6 rounded-full  m-2 p-2">
                        <FontAwesomeIcon icon={faMessage} onClick={() => setMessage(!message)} className='cursor-pointer w-10 h-10 text-2xl text-pallete flex flex-col justify-center items-center' />


                        <sup className="absolute -left-2 align-super" >

                            <span className="bg-clifford text-pallete text-xs font-medium p-0.5  rounded dark:bg-clifford dark:text-pallete border border-pallete">
                                12</span>
                        </sup>


                    </section>


                    <section className="relative flex justify-center items-center account w-6 h-6 rounded-full   mr-2 p-2">

                        <FontAwesomeIcon icon={faBell} className='cursor-pointer w-10 h-10 text-2xl text-pallete flex flex-col justify-center items-center' />
                        <sup className="absolute -left-2 align-super" >

                            <span className="bg-clifford text-pallete text-xs font-medium  p-0.5  rounded dark:bg-clifford dark:text-pallete border border-pallete">

                                12</span>
                        </sup>

                    </section>

                </section>


            </header>
            {message ? <HeaderIconsHover /> : null}
        </>

    )
}
export default Header;