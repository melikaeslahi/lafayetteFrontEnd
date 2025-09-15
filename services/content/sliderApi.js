import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  sliderApi = createApi({
    reducerPath: 'sliderApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/content/slider` ,
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       },
}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Slider'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
    
        getAllSlider: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Slider'],
      

        }),
        changeSliderStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Slider']
        }),
        deleteSlider: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Slider'],

        }),
       
        addNewProducts: builder.mutation({
            query: ({formData , params}) => {
                return {
                    url: `products/store/${params}`,
                    method: 'POST',
                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Slider'],

        }),
        addNewSlider: builder.mutation({
            query: (payload) => {
                return {
                    url: `store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Slider'],

        }),

        updateSlider: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `update/${id}`,
                    method: 'POST',

                    body: formData,


                }
            },
            invalidatesTags: ['Slider'],

        }),
        
        getSlider: builder.query({
            query: (id) => {

                return {
                    url: `show/${id}`,

                }
            },
            providesTags: ['Slider'],
         

        }),
      
 

        getProducts: builder.query({
            query: (id) => {

                return {
                    url: `products/${id}`,

                }
            },
            providesTags: ['Slider'],
          

        }),
      
        getAllParentId: builder.query({
            query: () => {

                return {
                    url: `parentId`,

                }
            },
            providesTags: ['Slider'],
       

        }),



    })
});
export const { 
   //postcategory
    useGetAllSliderQuery,
      useChangeSliderStatusMutation,
       useDeleteSliderMutation,
        useAddNewSliderMutation,
        useAddNewProductsMutation,
        useUpdateSliderMutation,
        useGetAllParentIdQuery,
        useGetSliderQuery,
        useGetProductsQuery,

 
    
    
    } =  sliderApi;


        
// export const {
//     useGetAllPostCategoryQuery,
//     useChangePostCategoryStatusMutation,
//     useDeletePostCategoryMutation,
   
//     useAddNewPostCategoryMutation,
//     useUpdatePostCategoryMutation,
//     useGetAllParentIdQuery,
//     useGetCategoryQuery,
//     util: { getRunningQueriesThunk },
// } = apiSlice;

// export const { getAllPostCategory,changePostCategoryStatus,getCategory ,getAllParentId,updatePostCategory,addNewPostCategory, deletePostCategory } = apiSlice.endpoints;