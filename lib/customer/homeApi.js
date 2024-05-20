import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer` ,
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
    tagTypes: ['Home'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
    //  content
     
   
     getHomeData: builder.query({
        query: () => {

            return {
                url: `/`,

            }
        },
        providesTags: ['home'],
 
    

    }),
     

    getProducts: builder.mutation({
        query: () => {
            
          
            
            return {
                 
                url:`/products`, 
                method:'GET',
               
                
            }
        },
        providesTags: ['home'],
 
    

    }),

     setFiltering: builder.mutation({
        query: ({formData , category =null }) => {
             
          
            
            return {
                 
                 
                url:`/products`, 
                params:{category},
                 method:'POST',
                body:formData
                
            }
        },
        providesTags: ['home'],


 
    

    }),
     
    getPage: builder.mutation({
        query: (slug) => {     
            return {            
                url:`/page/${slug}`, 
                method:'GET',         
            }
        },
        providesTags: ['home'],
 
    

    }),

    getPages: builder.query({
        query: () => {  
            return {   
                url:`/pages`, 
                method:'GET',
               
                
            }
        },
        providesTags: ['home'],
 
    

    }),
    getFaqs: builder.query({
        query: () => {  
            return {   
                url:`/faqs`, 
                method:'GET',
               
                
            }
        },
        providesTags: ['home'],
 
    

    }),
    getMenus: builder.query({
        query: () => {  
            return {   
                url:`/menus`, 
                method:'GET',
               
                
            }
        },
        providesTags: ['home'],
 
    

    }),

    })
});
export const { 
        useGetHomeDataQuery,
        useGetProductsMutation,
        useSetFilteringMutation,
        useGetPagesQuery,
        useGetPageMutation,
        useGetFaqsQuery,
        useGetMenusQuery,
    } = homeApi;


        
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
