import { baseApi } from '../baseApi';

export const  categoryValueApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
  
        getAllValue: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 , params } = arg;
                return {
                    url: `/market/property/value/${perPage}/${params}`,
                    params: { page },
                }
            },
            providesTags: ['Value'],
        }),
        
        deleteValue: builder.mutation({
            query( id) {
                return {
                    url: `/market/property/value/delete/${id}`,
                    method: 'DELETE',      
                }
            },
            invalidatesTags: ['Value'],
        }),
       
        
        addNewValue: builder.mutation({
            query: ({ params , formData}) => {
                return {
                    url: `/market/property/value/store/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Value'],

        }),

        updateValue: builder.mutation({
            query: ({ attribute , id, formData }) => {
                return {
                    url: `/market/property/value/update/${attribute}/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Value'],
        }),     
  
        getValue: builder.query({
            query: ({id}) => {
                return {
                    url: `/market/property/value/value/${id}`,
                }
            },
            providesTags: ['Value'],
        }),     
     
        productsAndAttributes: builder.query({
            query: () => {
                return {
                    url: `/market/property/value/productsAndAttributes/`,
                }
            },
            providesTags: ['Value'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllValueQuery,
        useDeleteValueMutation,
        useAddNewValueMutation,
        useUpdateValueMutation,
        useProductsAndAttributesQuery,
        useGetValueQuery,

    } =  categoryValueApi;