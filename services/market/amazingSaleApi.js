import { baseApi } from '../baseApi';

export const  amazingSaleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllAmazingSale: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/discount/amazingSale/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['AmazingSale'],
        }),
        deleteAmazingSale: builder.mutation({
            query(id) {
                return {
                    url: `/market/discount/amazingSale/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),
       
        addNewAmazingSale: builder.mutation({
            query: (formData) => {
                return {
                    url: `/market/discount/amazingSale/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),

        updateAmazingSale: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/market/discount/amazingSale/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),

        getProducts: builder.query({
            query: () => {
                return {
                    url: `/market/discount/amazingSale/product`,
                }
            },
            providesTags: ['AmazingSale'],
        }),

        getAmazingSale: builder.query({
            query: (id) => {
                return {
                    url: `/market/discount/amazingSale/amazingSale/${id}`,
                }
            },
            providesTags: ['AmazingSale'],
        }),
    }),
    overrideExisting: false,
    
});
export const { 
        useGetAllAmazingSaleQuery,    
        useDeleteAmazingSaleMutation,
        useAddNewAmazingSaleMutation,
        useUpdateAmazingSaleMutation,
        useGetProductsQuery,
        useGetAmazingSaleQuery,
      
    } =  amazingSaleApi;


        
 