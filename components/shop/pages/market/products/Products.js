import Product from "./Product" 
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