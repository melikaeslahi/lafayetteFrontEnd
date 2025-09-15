import { baseApi } from '../baseApi';

export const  brandApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllBrand: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg; 
                return {
                    url: `/market/brand/${perPage}/${search}`,
                    params: { page },    
                }
            },
            providesTags: ['Brand'],
        }),
        changeBrandStatus: builder.mutation({
            query: (id) => `/market/brand/status/${id}`,
            invalidatesTags: ['Brand']
        }),
   
        deleteBrand: builder.mutation({
            query(id) {
                return {
                    url: `/market/brand/delete/${id}`,
                    method: 'DELETE',     
                }
            },
            invalidatesTags: ['Brand'],
        }),
       
        addNewBrand: builder.mutation({
            query: (formData) => {
                return {
                    url: `/market/brand/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Brand'],
        }),

        updateBrand: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/market/brand/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Brand'],
        }),
 
        getBrand: builder.query({
            query: (id) => {

                return {
                    url: `/market/brand/brand/${id}`,
                }
            },
            providesTags: ['Brand'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllBrandQuery,
        useChangeBrandStatusMutation,
        useDeleteBrandMutation,
        useAddNewBrandMutation,
        useUpdateBrandMutation,
        useGetBrandQuery,     
    } =  brandApi;