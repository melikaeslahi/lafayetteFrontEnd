import Link from "next/link";
import CategorySidebar from "./CategorySidebar";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenuItem from "./SidebarMenuItem";

 
const ShowMenuItemOrCategory =({itemShow})=>{
    const {  isOpenItem } = useSelector(state => state.sidebar);

 
return(<>
  {itemShow?.children?.length > 0  && isOpenItem[itemShow?.id]?.id === itemShow?.id && isOpenItem[itemShow?.id]?.menuItemOpen === true ?
                                        <SidebarMenuItem  
                                            className={``}
                                            menuItems={itemShow.children} />  
                                        :
                                   itemShow?.productCategory || itemShow?.postCategory && isOpenItem[itemShow?.id]?.id === itemShow?.id && isOpenItem[itemShow?.id]?.menuItemOpen === true ?
                                   <ul>
                                    
                                        <CategorySidebar
                                            categories={itemShow?.productCategory.length > 0 ? itemShow?.productCategory : itemShow?.postCategory} />
                                            </ul>
                                            : null
                               }
</>)
}
export default ShowMenuItemOrCategory;