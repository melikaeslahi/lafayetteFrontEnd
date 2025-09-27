import { baseApi } from '../baseApi';

const url ="/admin/market/brand"

export const  brandApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllBrand: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg; 
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },    
                }
            },
            providesTags: ['Brand'],
        }),
        changeBrandStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,
            invalidatesTags: ['Brand']
        }),
   
        deleteBrand: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',     
                }
            },
            invalidatesTags: ['Brand'],
        }),
       
        addNewBrand: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Brand'],
        }),

        updateBrand: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Brand'],
        }),
 
        getBrand: builder.query({
            query: (id) => {

                return {
                    url: `${url}/brand/${id}`,
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