 
import { drawerOpenDropDown } from "@/store/reducers/dashboard/UtilSlice";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DrawerSubItems from "./DrawerSubItems";
 


const DrawerItems = () => {



    const { items } = useSelector((state) => state.util);
     
    const dispatch =  useDispatch();
     
    const pathName =  usePathname();
    // const router =useRouter();
    return (

        items.map((item, index) => (
            
         
            <li className="relative" key={index}>
                {item.link ? <Link  href={`${item.link}`}  className={`flex h-12 font-lotus cursor-pointer items-center justify-between   dark:text-gray-100 text-black  truncate rounded-[5px] px-6 py-4 text-[0.875rem]  outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-clifford active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none    dark:hover:bg-pallete dark:hover:bg-opacity-20 dark:hover:text-pallete   dark:focus:bg-pallete dark:active:bg-pallete   data-te-sidenav-link-ref ${pathName === item.link ? 'bg-pallete bg-opacity-20 text-pallete' : '' } `}
                  >
                    
                    <span>
                        {item.icon ? <FontAwesomeIcon icon={item.icon} className='pl-1' /> : null}
                        {item.name}
                    </span>
                   
                    
                </Link> : <a onClick={() => dispatch(drawerOpenDropDown([!item.openDropDown ,  index, null , item.id ]))} className={`flex  h-12 font-lotus cursor-pointer items-center justify-between truncate rounded-[5px] px-6  py-4 text-[0.875rem]  dark:text-gray-100 text-black   outline-none transition duration-300 ease-linear hover:bg-pallete hover:bg-opacity-20 hover:text-pallete hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-clifford active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none   dark:hover:bg-pallete dark:hover:bg-opacity-20 dark:hover:text-pallete   dark:focus:bg-pallete dark:active:bg-pallete   data-te-sidenav-link-ref`}
                  >
                        
                     
                        <span>
                        {item.icon ? <FontAwesomeIcon icon={item.icon} className='pl-1' /> : null}
                        {item.name}
                    </span>
                    {  item.openDropDown ? <FontAwesomeIcon icon={faAngleDown} className='pl-1' /> : <FontAwesomeIcon icon={faAngleLeft} className='pl-1' />}

                       
                  
                </a>}
                {item.children ? <ul className={`!visible relative m-0 ${item.openDropDown ? '' : 'hidden'}  list-none p-0 data-[te-collapse-show]:block data-te-sidenav-collapse-ref`}>
                    <DrawerSubItems pChildren={item.children}   hieght={'8'} padding={'pr-10 pl-6'} />
                </ul>
                    : null}
            </li> 
        ))

    )
}
export default DrawerItems;

