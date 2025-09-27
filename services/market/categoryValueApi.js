import { baseApi } from '../baseApi';
 
const url = '/admin/market/property/value'

export const  categoryValueApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
  
        getAllValue: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 , params } = arg;
                return {
                    url: `${url}/${perPage}/${params}`,
                    params: { page },
                }
            },
            providesTags: ['Value'],
        }),
        
        deleteValue: builder.mutation({
            query( id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',      
                }
            },
            invalidatesTags: ['Value'],
        }),
       
        
        addNewValue: builder.mutation({
            query: ({ params , formData}) => {
                return {
                    url: `${url}/store/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Value'],

        }),

        updateValue: builder.mutation({
            query: ({ attribute , id, formData }) => {
                return {
                    url: `${url}/update/${attribute}/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Value'],
        }),     
  
        getValue: builder.query({
            query: ({id}) => {
                return {
                    url: `${url}/value/${id}`,
                }
            },
            providesTags: ['Value'],
        }),     
     
        productsAndAttributes: builder.query({
            query: () => {
                return {
                    url: `${url}/productsAndAttributes/`,
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