import { baseApi } from '../baseApi';



export const  productCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllProductCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/category/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['ProductCategory'],
        }),
        changeProductCategoryStatus: builder.mutation({
            query: (id) => `/market/category/status/${id}`,
            invalidatesTags: ['ProductCategory']
        }),
        changeShowInMenu: builder.mutation({
            query: (id) => `/market/category/showInMenu/${id}`,
            invalidatesTags: ['ProductCategory']
        }),
        deleteProductCategory: builder.mutation({
            query(id) {
                return {
                    url: `/market/category/delete/${id}`,
                    method: 'DELETE',      
                }
            },
            invalidatesTags: ['ProductCategory'],

        }),
    
        addNewProductCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `/market/category/store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['ProductCategory'],
        }),

        updateProductCategory: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/market/category/update/${id}`,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['ProductCategory'],
        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `/market/category/parentId`,
                }
            },
            providesTags: ['ProductCategory'],
        }),
        getProductCategory: builder.query({
            query: (id) => {
                return {
                    url: `/market/category/category/${id}`,
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
