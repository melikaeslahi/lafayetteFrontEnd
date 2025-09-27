import { baseApi } from '../baseApi';

const url= '/admin/market/category'

export const  productCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllProductCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['ProductCategory'],
        }),
        changeProductCategoryStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,
            invalidatesTags: ['ProductCategory']
        }),
        changeShowInMenu: builder.mutation({
            query: (id) => `${url}/showInMenu/${id}`,
            invalidatesTags: ['ProductCategory']
        }),
        deleteProductCategory: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',      
                }
            },
            invalidatesTags: ['ProductCategory'],

        }),
    
        addNewProductCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['ProductCategory'],
        }),

        updateProductCategory: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['ProductCategory'],
        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `${url}/parentId`,
                }
            },
            providesTags: ['ProductCategory'],
        }),
        getProductCategory: builder.query({
            query: (id) => {
                return {
                    url: ` ${url}/category/${id}`,
                }
            },
            providesTags: ['ProductCategory'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllProductCategoryQuery,
        useChangeProductCategoryStatusMutation,
        useDeleteProductCategoryMutation,
        useAddNewProductCategoryMutation,
        useUpdateProductCategoryMutation,
        useGetAllParentIdQuery,
        useGetProductCategoryQuery,
        useChangeShowInMenuMutation
    } =  productCategoryApi;
