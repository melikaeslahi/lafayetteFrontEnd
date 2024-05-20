'use client'

import { drawerOpneClose } from '@/store/reducers/dashboard/UtilSlice'
import { faCartShopping, faClose, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
 

import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../public/image/logoOne.jpg'
import DrawerItems from './DrawerItems'
const Drawer = () => {

    const { openDrawer } = useSelector((state) => state.util);
    const dispatch = useDispatch()


    return (
        // <!-- Sidenav -->

        <nav
            id="sidenav-7 "
            className={`${openDrawer ? 'flex' : 'hidden'}  flex-col  ${openDrawer ? ' lg:hidden' : ' lg:flex'
                }   ${openDrawer ? 'xl:hidden' : 'xl:flex'
                } lg:flex-col xl:flex-col ${openDrawer ? 'md:flex' : 'md:hidden'
                }   dark:bg-zinc-700 bg-white text-right fixed right-0 top-0 z-[1035]  h-screen  md:w-1/2 lg:w-1/5 xl:w-1/5 translate-x-full overflow-y-auto   no-scrollbar   mb-5    text-black   shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:-translate-x-0 `}
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-right="true">
            {/* <!-- logo sidenav --> */}
            <FontAwesomeIcon className={`inline ${openDrawer ? 'flex' : 'hidden'} ${openDrawer ? 'md:flex' : 'md:hidden'
                } `} icon={faClose} onClick={() => dispatch(drawerOpneClose(false))} />
            <span
                className={`sticky top-1 z-10 flex justify-center m-2 pb-4 dark:bg-zinc-700 bg-white  border-b-2 border-pallete`}>

                <Image
                    src={logo}
                    alt="laffayte logo"
                    className="w-32 h-32 bg-bose-500 rounded-full border border-pallate shadow-pallete shadow-lg   mb-3"
                />
            </span>


            {/* <!-- logo sidenav --> */}

            <ul
                className="relative m-0 list-none px-[0.2rem] font-body"
                data-te-sidenav-menu-ref>
                <li className="relative hover:text-pallete">
                    <a
                        className={`flex h-12 font-lotus cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-black dark:text-gray-300   outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none focus:bg-clifford  focus:text-inherit focus:outline-none   active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none  dark:hover:bg-pallete dark:hover:bg-opacity-20 dark:hover:text-pallete   dark:focus:bg-pallete dark:active:bg-pallete`}
                        data-te-sidenav-link-ref>
                        <span
                            className={`mr-4 h-4 w-4  dark:text-gray-100 text-black `}>
                            <span className="hover:text-pallete">
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className="pl-1 text-sm"
                                />
                                خانه
                            </span>
                        </span>
                    </a>
                </li>

                <li className="relative">
                    <a
                        className={`flex h-12 font-lotus cursor-pointer  items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem]  outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-clifford active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10`}
                        data-te-sidenav-link-ref>
                        <span
                            className={`mr-4 h-4 w-4 text-black  dark:text-gray-100`}>
                            <span className="hover:text-pallete">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="pl-1"
                                />
                                فروشگاه
                            </span>
                        </span>
                    </a>
                </li>

                <DrawerItems />
            </ul>
        </nav>
    )
}
export default Drawer
