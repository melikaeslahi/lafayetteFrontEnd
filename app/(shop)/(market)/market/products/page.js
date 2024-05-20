'use client'
import Products from "@/components/shop/pages/market/products/Products";
import ProductsContainer from "@/components/shop/pages/market/products/ProductsContainer";
import SelectedFiltering from "@/components/shop/pages/market/products/SelectedFiltering";
import Sorting from "@/components/shop/pages/market/products/Sorting";
import { useSelector } from "react-redux";

const ProductsPage =() => {
    // const {isThLarge , isThList} =   useSelector( state =>state.util);
    return(
        <>
        <ProductsContainer title={'همه ی محصولات'}>
           

            <Products />
        </ProductsContainer>
        </>
    )
}
export default ProductsPage;