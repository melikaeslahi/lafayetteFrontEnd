import { baseApi } from '../baseApi';

const url = "admin/market/discount/commonDiscount";

export const  commonDiscountApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
  
        getAllCommonDiscount: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['CommonDiscount'],
        }),
       
        deleteCommonDiscount: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['CommonDiscount'],

        }),
       
        addNewCommonDiscount: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body:  formData,
                }
            },
            invalidatesTags: ['CommonDiscount'],
        }),

        updateCommonDiscount: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['CommonDiscount'],
        }),
        getCommonDiscount: builder.query({
            query: (id) => {
                return {
                    url: `${url}/commonDiscount/${id}`,
                }
            },
            providesTags: ['CommonDiscount'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllCommonDiscountQuery,
        useDeleteCommonDiscountMutation,
        useAddNewCommonDiscountMutation,
        useUpdateCommonDiscountMutation,  
        useGetCommonDiscountQuery,
      
    } =  commonDiscountApi;