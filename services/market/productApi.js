import { baseApi } from '../baseApi';



export const  productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllProduct: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/product/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Product'],
    

        }),
        changeProductStatus: builder.mutation({
            query: (id) => `/market/product/status/${id}`,

            invalidatesTags: ['Product']
        }),
        changeMarketable: builder.mutation({
            query: (id) => `/market/product/marketable/${id}`,

            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `/market/product/delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Product'],

        }),
       
        
        addNewProduct: builder.mutation({
            query: (payload) => {
                return {
                    url: `/market/product/store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Product'],

        }),

        updateProduct: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/market/product/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Product'],
        }),
      
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `/market/product/product/${id}`,
                }
            },
            providesTags: ['Product'],
        }),

         getCategoriesAndBrands: builder.query({
            query: () => {
                return {
                    url: `/market/product/categoryAndBrand/`,
                }
            },
            providesTags: ['Product'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllProductQuery,
        useChangeProductStatusMutation,
        useDeleteProductMutation,
        useAddNewProductMutation,
        useUpdateProductMutation,
        useGetCategoriesAndBrandsQuery,
        useGetProductQuery,
        useChangeMarketableMutation
    } =  productApi;


        
 