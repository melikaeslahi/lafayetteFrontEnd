import Link from "next/link";
import { useSelector } from "react-redux";
import OpenButtonMenuItems from "./OpenButtonMenuItem";

const SubCategorySidbar = ({ subCategories }) => {
 
    const {isOpenItem} =  useSelector(state => state.sidebar);
 
    return (
        <>
            {subCategories?.map((child, index) => (
                <li key={`subCategory-${child.id}`} className="flex flex-col pb-1 pr-0.5">

                    <section className="flex justify-between items-center">
                        <h1>
                            <Link
                                href={'/'}
                                className="hover:text-pallete text-sm">
                                {child.name}
                            </Link> </h1>
                            <OpenButtonMenuItems selectedMenu={child} />
                       
                    </section>
                    {child?.children.length > 0  && isOpenItem[child?.id]?.id === child.id && isOpenItem[child?.id]?.menuItemOpen === true ?
                        <ul className="">
                            <SubCategorySidbar subCategories={child.children} />
                        </ul>
                        : null}
                </li>
            ))}

        </>
    )
}
export default SubCategorySidbar;