import Image from "next/image"
import Product from "./Product"
import slide3 from '../../../../../public/image/IMG_20230529_183159.jpg'
import { useSelector } from "react-redux";
 


const Products = () => {
    const {isThLarge , isThList} =   useSelector( state =>state.util);
 
    return (
        <>
        <section className={`grid ${isThLarge ? 'xl:grid-cols-4  lg:grid-cols-4 md:grid-cols-3  grid-cols-2 w-full' : ' w-full grid-cols-1' }    `}>
        <Product />
               
 
        </section>
          
        </>
    )
}
export default Products