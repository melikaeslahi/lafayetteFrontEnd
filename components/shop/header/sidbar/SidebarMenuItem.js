import Link from "next/link";
import CategorySidebar from "./CategorySidebar";
import { useSelector } from "react-redux";
import OpenButtonMenuItems from "./OpenButtonMenuItem";
import ShowMenuItemOrCategory from "./ShowMenuItemOrCategory";
const SidebarMenuItem = ({ menuItems }) => {
    const { isOpenItem } = useSelector(state => state.sidebar);
    return (
        <>
            <ul className={`pr-1 `}>
                
                    <li key={`menuItem-${menuItems.id}`} className={`flex flex-col pb-1 pr-1 `}>
                        <section className="flex justify-between items-center">
                            <h1>
                                <Link
                                    href={'/'}
                                    className="hover:text-pallete text-sm">
                                    {menuItems.name}
                                </Link>
                             </h1>
                            <OpenButtonMenuItems selectedMenu={menuItems} />
                        </section>
                        {menuItems.children?.length > 0  && isOpenItem[menuItems.id]?.id === menuItems.id && isOpenItem[menuItems.id]?.menuItemOpen === true ?  
                        menuItems.children.map((child , index)=>(
                             child.children?.length > 0  &&  isOpenItem[child.id]?.id === child.id && isOpenItem[child.id]?.menuItemOpen === true ?
                            <SidebarMenuItem key={`item-${child.id}`} menuItems={child} />:
                              child.productCategory || child.postCategory && isOpenItem[child.id]?.id === child.id && isOpenItem[child.id]?.menuItemOpen === true ?   
                            <ul className="">
                                <CategorySidebar categories={child.productCategory ? child.productCategory : child.postCategory} />
                            </ul>: null 
                        )) 
                           
                       : menuItems.productCategory || menuItems.postCategory && isOpenItem[menuItems.id]?.id === menuItems.id && isOpenItem[menuItems.id]?.menuItemOpen === true ?   
                        <ul className="">
                            <CategorySidebar categories={menuItems.productCategory ? menuItems.productCategory : menuItems.postCategory} />
                        </ul>: null}        
                    </li>


            

            </ul>
        </>
    )
}
export default SidebarMenuItem;

