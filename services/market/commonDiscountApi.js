import { baseApi } from '../baseApi';

export const  commonDiscountApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
  
        getAllCommonDiscount: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/discount/commonDiscount/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['CommonDiscount'],
        }),
       
        deleteCommonDiscount: builder.mutation({
            query(id) {
                return {
                    url: `/market/discount/commonDiscount/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['CommonDiscount'],

        }),
       
        addNewCommonDiscount: builder.mutation({
            query: (formData) => {
                return {
                    url: `/market/discount/commonDiscount/store`,
                    method: 'POST',
                    body:  formData,
                }
            },
            invalidatesTags: ['CommonDiscount'],
        }),

        updateCommonDiscount: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/market/discount/commonDiscount/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['CommonDiscount'],
        }),
        getCommonDiscount: builder.query({
            query: (id) => {
                return {
                    url: `/market/discount/commonDiscount/commonDiscount/${id}`,
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