import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  galleryApi = createApi({
    reducerPath: 'galleryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/market/product/gallery` ,
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
    tagTypes: ['Gallery'],

    // headers:{
    //     'Access-Control-Allow-Origin': '*',
    //        'Content-Type' :'multipart/form-data'
    // },
    credentials: true,

    endpoints: (builder) => ({
  
        getAllGallery: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0  , params} = arg;
                return {
                    url: `${perPage}/${params}`,
                    params: { page },
                }
            },
            providesTags: ['Gallery'],
    

        }),
     
        
        deleteGallery: builder.mutation({
            query(id) {
                return {
                    url: `delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Gallery'],

        }),
       
        
        addNewGallery: builder.mutation({
            query: ({  params,  formData  }) => {
                return {
                    url: `store/${params}`,
                    method: 'POST',

                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Gallery'],

        }),

        
      
       
      
     
       

    



    })
});
export const { 
        useGetAllGalleryQuery,       
        useDeleteGalleryMutation,
        useAddNewGalleryMutation,
      
    } =  galleryApi;


        
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