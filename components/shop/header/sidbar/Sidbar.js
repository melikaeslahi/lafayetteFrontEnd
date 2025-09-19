'use client';
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Modal";
import { setSidebarOpen } from "@/store/reducers/dashboard/UtilSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useGetMenusQuery } from "@/services/customer/homeApi";
import CategorySidebar from "./CategorySidebar";
import SidebarMenuItem from "./SidebarMenuItem";
import { getMenuItemOpen, setMenuItemOpen } from "@/store/reducers/customer/sidebarSlice";
import SidebarHeader from "./SidbarHeader";
import OpenButtonMenuItems from "./OpenButtonMenuItem";
import ShowMenuItemOrCategory from "./ShowMenuItemOrCategory";

const Sidebar = () => {
    const { isOpenItem } = useSelector(state => state.sidebar);
    const { isSidebarOpen } = useSelector(state => state.util);
    const { data } = useGetMenusQuery();

    return (
        <>
            <Modal
                margin={'mr-0'}
                close={false}
                widthAndHiegth={'relative h-full w-4/6 rounded-none border-none '}
                blur={'backdrop-blur-0'}
                position={'fixed bottom-0 top-0 right-0 w-full md:w-2/6 lg:w-2/6 xl:w-2/6  flex justify-start items-start'}
                show={isSidebarOpen}
                closeMethod={setSidebarOpen}
            >

                <SidebarHeader />
                <aside className="mt-2 p-2 w-full">
                    <ul>
                        {data?.menus.length > 0 ? data.menus.map((menu, index) => (

                            <SidebarMenuItem
                                className={``}
                                menuItems={menu} />
                        
                        )) : null}

                    </ul>
                </aside>

            </Modal>
        </>

    );
}
export default Sidebar;

 


    //  <li key={menu.id} className="flex flex-col pb-3">
    //                             <section className="flex justify-between items-center">
    //                                 <h1>
    //                                     <Link
    //                                         href={'/'}
    //                                         className="hover:text-pallete text-sm">
    //                                         {menu.name}
    //                                     </Link> </h1>

    //                                     <OpenButtonMenuItems selectedMenu={menu} />



    //                             </section>
    //                               {/* <ShowMenuItemOrCategory itemShow={menu} /> */}
    //                                 {menu.children.length > 0 ?
    //                                 isOpenItem[menu.id]?.id === menu.id && isOpenItem[menu.id]?.menuItemOpen === true ?
    //                                     <SidebarMenuItem
    //                                         className={``}
    //                                         menuItems={menu.children} /> : null
    //                                     :
    //                                 isOpenItem[menu.id]?.id === menu.id && isOpenItem[menu.id]?.menuItemOpen === true ?
    //                                 <ul>


    //                                     <CategorySidebar
    //                                         categories={menu.productCategory.length > 0 ? menu.productCategory : menu.postCategory} />
    //                                           </ul> : null
    //                            }  


    //                         </li>