import { getMenuItemOpen, setMenuItemOpen } from "@/store/reducers/customer/sidebarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
const OpenButtonMenuItems = ({ selectedMenu }) => {
    const dispatch = useDispatch();
    const { isOpenItem } = useSelector(state => state.sidebar);
    return (
        <>
            <FontAwesomeIcon
                onClick={() => {
                    dispatch(setMenuItemOpen({ name: selectedMenu.name, id: selectedMenu.id }));
                    dispatch(getMenuItemOpen())
                }
                }
                className={`${selectedMenu?.children?.length > 0 || selectedMenu?.productCategory || selectedMenu?.postCategory ? 'hover:text-pallete text-sm' : 'hidden'} `}
                icon={isOpenItem[selectedMenu?.id]?.id === selectedMenu?.id && isOpenItem[selectedMenu?.id]?.menuItemOpen === true ? faCircleMinus : faCirclePlus} />
        </>
    )
}
export default OpenButtonMenuItems;