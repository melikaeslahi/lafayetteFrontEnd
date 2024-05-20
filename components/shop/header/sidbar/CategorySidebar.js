import Link from "next/link";
import SubCategorySidbar from "./SubCategorySidebar";
import { useSelector } from "react-redux";
import OpenButtonMenuItems from "./OpenButtonMenuItem";
const CategorySidebar = ({ categories }) => {
    const { isOpenItem } = useSelector(state => state.sidebar);
    console.log(categories);
    return (
         <>
            <li className="flex flex-col pb-1 pr-1">
                <section className="flex justify-between items-center">
                    <h1>
                        <Link
                            href={'/'}
                            className="hover:text-pallete text-sm">
                            {categories?.name}
                        </Link> </h1>
                    <OpenButtonMenuItems selectedMenu={categories} />

                </section>
                {categories?.children.length > 0 && isOpenItem[categories?.id]?.id === categories.id && isOpenItem[categories?.id]?.menuItemOpen === true ?
                    <ul className="">
                        <SubCategorySidbar subCategories={categories.children} />
                    </ul> : null}

            </li>


        </>
    )
}
export default CategorySidebar;