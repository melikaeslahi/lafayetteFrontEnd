import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useState } from "react";
import SubCategoryMenus from "./SubCategoryMenus";


const CategoryMenus = ({ menuItem, menuItemChidlren }) => {

    

   return (<>
      {menuItemChidlren ?
         menuItemChidlren.map(({ name, postCategory, productCategory }) => (
            <ul className="flex flex-col pl-3 pb-3 overflow-y-auto h-86  justify-between items-start 1/4">

               <li className=" w-full flex justify-between items-center">
                  <Link href="/" className="text-pallete text-base font-bold hover:text-pallete py-2"> {name} </Link>
                  <FontAwesomeIcon icon={faAngleDown} />
               </li>
               <li className=" w-full flex justify-between items-center">
                  <Link href="/" className="text-black text-base font-bold hover:text-pallete py-2"> {productCategory ? productCategory?.name : postCategory?.name} </Link>
                  <FontAwesomeIcon icon={faAngleDown} />
               </li>

               {productCategory?.children?.length > 0 ? productCategory?.children.map((child, index) => {


                  return (
                     <li key={index} className="w-full flex flex-col justify-between items-center ">
                        <section className="flex  justify-between items-center w-full">
                           <Link href="/" className={` ${child?.children?.length > 0 ? 'text-black font-bold' : 'text-gray-300'}    hover:text-pallete py-1`}> {child?.name} </Link>

                           <FontAwesomeIcon className={`${child.children?.length > 0 ? 'flex' : 'invisible'}`} icon={faAngleDown} />
                        </section>

                        {child.children.length > 0 ? <>
                           <ul className="flex flex-col w-full  justify-between items-start ">
                              <SubCategoryMenus subCategories={child.children} />
                           </ul>
                        </>
                           : null
                        }

                     </li>)
               }) : postCategory.children.length > 0 ?
                  postCategory?.children.map((child, index) => {


                     return (
                        <li key={index} className="w-full flex flex-col justify-between items-center ">
                           <section className="flex  justify-between items-center w-full">
                              <Link href="/" className={` ${child?.children?.length > 0 ? 'text-black font-bold' : 'text-gray-300'}    hover:text-pallete py-1`}> {child?.name} </Link>

                              <FontAwesomeIcon className={`${child.children?.length > 0 ? 'flex' : 'invisible'}`} icon={faAngleDown} />
                           </section>

                           {child.children.length > 0 ? <>
                              <ul className="flex flex-col w-full  justify-between items-start ">
                                 <SubCategoryMenus subCategories={child.children} />
                              </ul>
                           </>
                              : null
                           }

                        </li>)
                  })
                  : null}

            </ul>
         ))

         :
         <ul className="flex flex-col  overflow-y-auto h-86  justify-between items-start 1/4">
            <li className=" w-full flex justify-between items-center">
               <Link href="/" className="text-black text-base font-bold hover:text-pallete py-2"> {menuItem?.name} </Link>
               <FontAwesomeIcon icon={faAngleDown} />
            </li>

            {menuItem?.children?.length > 0 ? menuItem?.children.map((child, index) => {


               return (<li key={index} className="w-full flex flex-col justify-between items-center ">
                  <section className="flex  justify-between items-center w-full">
                     <Link href="/" className={` ${child?.children?.length > 0 ? 'text-black font-bold' : 'text-gray-300'}    hover:text-pallete py-1`}> {child?.name} </Link>

                     <FontAwesomeIcon className={`${child.children?.length > 0 ? 'flex' : 'invisible'}`} icon={faAngleDown} />
                  </section>

                  {child.children.length > 0 ? <>
                     <ul className="flex flex-col w-full  justify-between items-start ">
                        <SubCategoryMenus subCategories={child.children} />
                     </ul>
                  </>
                     : null
                  }

               </li>)
            }) : null}

         </ul>

      }


   </>



   );
}
export default CategoryMenus;