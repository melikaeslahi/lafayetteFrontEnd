import { baseApi } from '../baseApi';

export const storeApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
  
        getAllProduct: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/store/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Store'],
        }),
            
        addToStore: builder.mutation({
            query: ({params ,  formData}) => {
                return {
                    url: `/market/store/store/${params}`,
                    method: 'POST',

                    body: formData,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Store'],

        }),

        updateStore: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/market/store/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Store'],

        }),
      
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `/market/store/product/${id}`,
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
