import { baseApi } from '../baseApi';

const url = "admin/market/store";

export const storeApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
  
        getAllProduct: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Store'],
        }),
            
        addToStore: builder.mutation({
            query: ({params ,  formData}) => {
                return {
                    url: `${url}/store/${params}`,
                    method: 'POST',
                    body: formData,
             
                }
            },
            invalidatesTags: ['Store'],

        }),

        updateStore: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Store'],

        }),
      
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `${url}/product/${id}`,
                }
            },
            providesTags: ['Store'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllProductQuery,
        useGetProductQuery,
        useAddToStoreMutation,
        useUpdateStoreMutation, 
    } =  storeApi;
