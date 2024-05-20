import { useGetMenusQuery } from "@/lib/customer/homeApi";
import Link from "next/link";
import { useRef, useState } from "react";
import Categories from "../../pages/market/products/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CategoryMenus from "./CategoryMenus";

const Menus = () => {
    const { data: menus } = useGetMenusQuery();
    const linkRef = useRef();
    const [ menuItem , setMenuItem]=useState();
     const [menuItemChildren , setMenuItemChildren] = useState();
     
  

    return (<>
        <nav className={'w-full h-full '} >
            <ul className={'h-full flex justify-center items-center'} >
                {menus?.menus?.length > 0 ? menus?.menus.map((menu, index) => (

                    <li className={'h-full group flex  justify-center items-center hover:text-pallete'} >

                        <Link
                            ref={linkRef}
                            key={index}
                            className="group relative transition-all px-2 py-6 duration-500  delay-150 text-lotus    text-center   hover:text-pallete  "
                            href={menu.url} >  {menu.name}

                            <span class="ease absolute bottom-0 right-0 h-1 w-0 border-b-2 border-pallete transition-all duration-200 group-hover:w-full"></span>


                        </Link>



                        <section
                            className="absolute top-32 right-0 left-0 z-50 mt-3 p-4 shadow-[rgba(0,0,10,0.1)_5px_5px_0.5px_10px] invisible     group-hover:visible group-hover:transition-all  group-hover:duration-500  group-hover:delay-1000 w-full h-full bg-white dark:bg-zinc-600  ">

                            {/* first render showing menu children */}
                            <section className="w-full  h-full p-4 border-r-4 border-pallete flex  justifiy-center items-center">
                             
                                    <section className={'  h-full w-full shadow-lg flex justify-start items-start'}>
                                        <ul className={'w-1/4 flex flex-col justifiy-start items-start p-1 m-2   border-b-1 border-gray-400'}>
                                            {menu?.children.map((child, index) => (
                                                <li     
                                                onMouseLeave={()=> child.children.length > 0 ? setMenuItemChildren( child.children ) && setMenuItem(null) : setMenuItem(  child.productCategory ? child.productCategory : child.postCategory )  && setMenuItemChildren(null)}
                                                     onMouseEnter={()=> child.children.length > 0 ? setMenuItemChildren( child.children ) && setMenuItem(null) : setMenuItem(  child.productCategory ? child.productCategory : child.postCategory ) && setMenuItemChildren(null)} 
                                                     
                                                     className=" px-5 py-3 w-full h-full hover:cursor-pointer  hover:border-r-2 hover:border-pallete flex justify-between items-center hover:text-pallete hover:bg-pallete hover:bg-opacity-20">

                                                    <Link 
                                                    className="group text-lotus text-black px-2 pb-1 text-center hover:text-pallete " 
                                                    key={index} 
                                                    href={`/market/products`}>
                                                        {child.name}

                                                    </Link>
                                                    

                                                    <FontAwesomeIcon className="text-black hover:cursor-pointer" icon={faAngleLeft} />

                                                     
                                                </li>
                                            ))}

                                        </ul>

                                        <section className="w-3/4 flex   overflow-y-auto flex-wrap justify-start items-start p-5 border-r-0 border-pallete">
                                           
                                            <CategoryMenus menuItem={menuItem} menuItemChidlren={menuItemChildren} />

                                            
                                        </section>

                                    </section> 

                                
                            </section>

                        </section>
                    </li>

                )) : null}
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >   زنانه    </Link>
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >    مردانه     </Link>
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >     بچه گانه     </Link>
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >      اکسسوری       </Link>
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >       وبلاگ       </Link>
                <Link className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  " href={'/'} >        درباره ی ما       </Link>
            </ul>

            <section></section>
        </nav>
    </>);
}
export default Menus;




// {menu?.children ?
//     <section className="relative flex flex-col justifiy-center items-center w-full h-full">
//         <section>
//             {menu?.children.map((child, index) => (
//                 <>
//                     <section className={'group h-2/12 flex justify-center items-center border border-gray-100 rounded-lg'}>

//                         <Link

//                             key={index}
//                             className="text-lotus px-2 pb-1 text-center hover:border-pallete hover:border-b-2 hover:text-pallete  "
//                             href={child.url} >  {child.name}



//                         </Link>

//                     </section>
//                     <section className="invisible absolute top-12 h-10/12 group-hover:visible ">
//                         {child?.productCategory || child?.postCategory ?
//                             <Categories category={child?.prouductCategory ? child?.productCategory : child.postCategory} />
//                             : null}
//                     </section> </>
//             ))}
//         </section>



//     </section> :

//     <section className="relative flex flex-col justifiy-center items-center w-3/4 h-full">

//         <>

//             <section className="  absolute top-12 h-10/12  ">

//                 <section className="flex flex-col justify-center items-center">

//                     <section className="group " key={index}>
//                         <Link href={`/market/products?categories=${menu.productCategory.slug}`}>
//                             {menu.productCategory.name}
//                         </Link>
//                         {category?.children ?
//                             <Categories SubCategoryMenus={category?.children} className="invisible group-hover:visible" />
//                             : null
//                         }

//                     </section>


//                 </section>
//                 {/* { menu?.productCategory || menu.PostCategory ?
//   <Categories category={menu.productCategory ? menu?.productCategory : menu?.PostCategory} />
// : null} */}
//             </section> </>



//     </section>
// }