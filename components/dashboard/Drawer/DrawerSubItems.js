
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { drawerOpenDropDown } from '@/store/reducers/dashboard/UtilSlice';

import { useSelector } from 'react-redux';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const DrawerSubItems = ({ hieght, pChildren, padding }) => {

    const { openDropDown } = useSelector((state) => state.util);
    // const router = useRouter();
    const dispatch = useDispatch();
    const pathName = usePathname();
    return (



        pChildren?.map((item, index) => (

            (
                <li key={index} className="relative">
                    {item.link ? <Link href={`${item.link}`} className={`flex h-${hieght} font-lotus cursor-pointer items-center justify-between truncate rounded-[5px] ${padding} py-4  outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none    focus:bg-pallete  focus:bg-opacity-20   focus:outline-none   data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none    dark:hover:bg-pallete dark:hover:bg-opacity-20 dark:hover:text-pallete   dark:focus:bg-pallete dark:active:bg-pallete  data-te-sidenav-link-ref ${pathName === item.link ? 'bg-pallete bg-opacity-30  text-pallete' : ' dark:text-gray-100  text-black ' }`} 
                    >
                   

                            <span>
                                {item.icon ? <FontAwesomeIcon icon={item.icon} className='pl-1' /> : null}
                                {item.name}
                            </span>

                     


                    </Link> : <a onClick={() => dispatch(drawerOpenDropDown([!item.openDropDown, openDropDown.index, index, item.id]))}  className={`flex h-${hieght} font-lotus cursor-pointer items-center justify-between truncate rounded-[5px] ${padding} py-4 text-[0.875rem]   dark:text-gray-100 text-black   outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none focus:bg-pallete  focus:bg-opacity-20   focus:outline-none active:bg-clifford active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none  dark:hover:bg-pallete dark:hover:bg-opacity-20 dark:hover:text-pallete   dark:focus:bg-pallete dark:active:bg-pallete  data-te-sidenav-link-ref`}
                    >
                    
                            <span>
                                {item.icon ? <FontAwesomeIcon icon={item.icon} className='pl-1' /> : null}
                                {item.name}
                            </span>
                            {(item.openDropDown ? <FontAwesomeIcon icon={faAngleDown} className='pl-1' /> : <FontAwesomeIcon icon={faAngleLeft} className='pl-1' />)}
                       




                    </a>}
                    {item.children ? <ul className={`!visible relative m-0 ${item.openDropDown ? '' : 'hidden'}  list-none p-0 data-[te-collapse-show]:block data-te-sidenav-collapse-ref`}>
                        <DrawerSubItems pChildren={item.children} hieght={'6'} padding={'pl-[3.4rem] pr-12'} />
                    </ul>
                        : null}
                </li>
            )
        ))

    )
}
export default DrawerSubItems;






