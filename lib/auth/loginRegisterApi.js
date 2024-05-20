import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'
import { getCookie } from "cookies-next";

export const  loginRegisterApi = createApi({
    reducerPath: 'loginRegisterApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    prepareHeaders: (headers, { extra }) => {
        headers.set('X-XSRF-TOKEN' , extra.cookie) // cookies is the name of the field added to the extraArgument
     
         return headers
       },
    credentials: "include",
    mode: 'cors',
 }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['LoginRegister'],
    endpoints: (builder) => ({
 
        csrf: builder.mutation({
            query() {
              return {
                url: "api/sanctum/csrf-cookie",        
              }
            },
        providesTags: ['LoginRegister'],
    }),

     user: builder.mutation({
        query() {
          return {
            url: "api/user",        
          }
        },
    providesTags: ['LoginRegister'],
}),

     LoginRegister: builder.mutation({
        query: (formData) => {
            return {
                url: `api/login-register`,
                method:'POST',
                body:formData,         
            }
        },
        providesTags: ['LoginRegister'],  

    }),
     
    getOtpData: builder.mutation({
        query: (token) => {
            return {
                url: `api/login-confirm/${token}`,
            }
        },
        providesTags: ['LoginRegister'],
    }),

    LoginConfirm: builder.mutation({
        query: ({  formData , token  }) => {
            return {
                url: `api/login-confirm/${token}`,
                method:'POST',
                body:formData ,
            }
        },
        providesTags: ['LoginRegister'],
    }),
     
    resendOtp: builder.mutation({
        query: (token) => {
            return {
                url: `api/login-resend-otp/${token}`,
            }
        },
        providesTags: ['LoginRegister'],
    }),

     logout: builder.mutation({
        query: () => {
            return {
                url: `api/logout`,
            }
        },
        providesTags: ['LoginRegister'],
    }),
    })
});
export const { 
        useLoginRegisterMutation,
        useLoginConfirmMutation,
        useGetOtpDataMutation,
        useCsrfMutation,
        useResendOtpMutation,
        useLogoutMutation,
        useUserMutation
    } = loginRegisterApi;

    
 
        
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