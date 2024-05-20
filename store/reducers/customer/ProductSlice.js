import items from "@/constant/dashbord/items";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    gallery: [],
    calculate:{},
    comments:[],
    slug:null,
    product:null,
    isFavorite:false,
    commentModal: false,
    // product cart
    original_product_price:0,
    selected_color_price:0,
    
    number:1,
     
    product_discount_price:0,
    isProductGalleryOpen:false

} 

const ProductSlice = createSlice({
    name: 'productCustomer',
    initialState: initialState,
    reducers: {
       
        setGallery: (state, action) => {
            state.gallery = action.payload;

        },
     
         setCalculatePrice: (state, action) => {
            state.calculate = action.payload;

        },

        setComments: (state, action) => {
            state.comments = action.payload;

        },
        setSlug: (state, action) => {
            state.slug = action.payload;

        },
         setProduct: (state, action) => {
            state.product = action.payload;

        },
        setIsFavorite: (state, action) => {
            state.isFavorite = action.payload;

        },
        setNumber:(state, action)=>{
            state.number =action.payload;
        },
        setSelectedColorPrice:(state, action)=>{
            state.selected_color_price =action.payload;
        },
        setOriginalProductPrice:(state, action)=>{
            state.original_product_price =action.payload;
        },
        setProductDiscountPrice:(state, action)=>{
            state.product_discount_price =action.payload;
        },setCommentModal:(state, action)=>{
            state.commentModal =action.payload;
        },
        setIsProductGalleryOpen: (state, action) => {
             
            state.isProductGalleryOpen = action.payload;
        },

    }
});

export const ProductCustomerReducer = ProductSlice.reducer;
export const {
    
     setGallery,
     setCalculatePrice,
     setComments,
     setSlug,
     setProduct,
     setIsFavorite,
     setNumber,
     setSelectedColorPrice,
     setOriginalProductPrice,
     setProductDiscountPrice,
     setCommentModal,
     setIsProductGalleryOpen
     } = ProductSlice.actions;