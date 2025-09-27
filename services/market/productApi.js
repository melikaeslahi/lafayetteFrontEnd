import { baseApi } from '../baseApi';

const url = "/admin/market/product"

export const  productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllProduct: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Product'],
    

        }),
        changeProductStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Product']
        }),
        changeMarketable: builder.mutation({
            query: (id) => `${url}/marketable/${id}`,

            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['Product'],

        }),
       
        
        addNewProduct: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Product'],

        }),

        updateProduct: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Product'],
        }),
      
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `${url}/product/${id}`,
                }
            },
            providesTags: ['Product'],
        }),

         getCategoriesAndBrands: builder.query({
            query: () => {
                return {
                    url: `${url}/categoryAndBrand/`,
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


        
 