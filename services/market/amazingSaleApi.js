import { baseApi } from '../baseApi';

const url ="/admin/market/discount/amazingSale"

export const  amazingSaleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllAmazingSale: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['AmazingSale'],
        }),
        deleteAmazingSale: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),
       
        addNewAmazingSale: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),

        updateAmazingSale: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['AmazingSale'],
        }),

        getProducts: builder.query({
            query: () => {
                return {
                    url: `${url}/product`,
                }
            },
            providesTags: ['AmazingSale'],
        }),

        getAmazingSale: builder.query({
            query: (id) => {
                return {
                    url: `${url}/amazingSale/${id}`,
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


        
 