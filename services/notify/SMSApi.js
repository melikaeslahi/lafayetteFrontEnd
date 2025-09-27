import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from 'postcss';
import { HYDRATE } from 'next-redux-wrapper'
import { baseApi } from '../baseApi';

const url ='/admin/notify/sms'

export const  SMSApi = baseApi.injectEndpoints({
    

    endpoints: (builder) => ({
  
        getAllSMS: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['SMS'],
    

        }),
        changeSMSStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['SMS']
        }),
        
        deleteSMS: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',        
                }
            },
            invalidatesTags: ['SMS'],
        }),
       
        addNewSMS: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['SMS'],

        }),

        updateSMS: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['SMS'],

        }),
        
        getSMS: builder.query({
            query: (id) => {
                return {
                    url: `${url}/sms/${id}`,
                }
            },
            providesTags: ['SMS'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllSMSQuery,
        useChangeSMSStatusMutation,
        useDeleteSMSMutation,
        useAddNewSMSMutation,
        useUpdateSMSMutation, 
        useGetSMSQuery,
       
    } =  SMSApi;


        
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