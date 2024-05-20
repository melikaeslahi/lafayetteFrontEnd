import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'



export const  profileApi = createApi({
    reducerPath: 'ProfileApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/profile` , 
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       },
       credentials:  'include',

}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Profile'],

   
   

    endpoints: (builder) => ({
      //profile/profile

      updateProfile: builder.mutation({
        query: ( formData ) => {

            return {
                url: `/profile/update`,
                method: 'POST',

                body: formData,


            }
        },
        invalidatesTags: ['Profile'],

    }),
   
    getProvince: builder.query({
        query: () => {

            return {
                url: `province`,

            }
        },
        providesTags: ['Profile'],
 

    }),

    getOrders: builder.query({
        query: (arg) => {
            const { type  } = arg;
             
            return {
                url: type === null ? `orders` : `orders?type=${type}`,
                  
            }
        },
        providesTags: ['Profile'],


    }),

    getDetailOrder: builder.query({
        query: (id) => `orders/detail/${id}`,

        invalidatesTags: ['Profile']
    }),
    getShowOrder: builder.query({
        query: (id) => `orders/show/${id}`,

        invalidatesTags: ['Profile']
    }),

    deleteFavorite: builder.mutation({
        query(id) {
            return {
                url: `/favorite/delete/${id}`,
                method: 'DELETE',

                      
            }
        },
        invalidatesTags: ['Profile'],

    }),
   

    //tickets 

     getAllTickets: builder.mutation({
        query: ( ) => {
          
            return {
                url: `my-tickets`,  
            }
        },
        providesTags: ['Profile'],
    

    }),
  
    getPriorityAndCategory: builder.mutation({
        query: ( ) => {
          
            return {
                url: `my-tickets/create`,  
            }
        },
        providesTags: ['Profile'],
    

    }),
    getTicket: builder.mutation({
        query: (id) => {
          
            return {
                url: `my-tickets/show/${id}`,  
            }
        },
        providesTags: ['Profile'],
    

    }),
    
    changeTicket: builder.mutation({
        query: (id) => {
          
            return {
                url: `my-tickets/change/${id}`,  
            }
        },
        providesTags: ['Profile'],
    

    }),

    answerTicket: builder.mutation({
        query: ({formData ,id}) => {
            return {
                url: `my-tickets/answer/${id}`,
                method: 'POST',

                body:  formData,
                FormData: true,
                credentials: 'include',
            }
        },
        invalidatesTags: ['Profile'],

    }),

    addNewTicket: builder.mutation({
        query: (formData) => {
            return {
                url: `my-tickets/store`,
                method: 'POST',

                body: formData,
                FormData: true,
                credentials: 'include',
            }
        },
        invalidatesTags: ['Profile'],

    }),

 
 
   

    
 


    })
});
export const { 
        useUpdateProfileMutation,
        useGetProvinceQuery,
        useGetOrdersQuery,
        useGetDetailOrderQuery,
        useGetShowOrderQuery,
        useDeleteFavoriteMutation,
        useAddNewTicketMutation,
         useChangeTicketMutation,
        useGetAllTicketsMutation,         
        useGetPriorityAndCategoryMutation,
        useGetTicketMutation,
        useAnswerTicketMutation,
        
    } = profileApi;


        
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