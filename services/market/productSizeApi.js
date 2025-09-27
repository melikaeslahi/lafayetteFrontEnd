import { baseApi } from '../baseApi';

const url = '/admin/market/product/sizes'

export const  productSizeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllProductSize: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 ,params, search  } = arg;
                return {
                    url: `${url}/${perPage}/${params}/${search}`   ,
                    params: { page },
                }
            },
            providesTags: ['Size'],
        }),
       
        deleteProductSize: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',      
                }
            },
            invalidatesTags: ['Size'],
        }),
       
        
        addNewProductSize: builder.mutation({
            query: ({ params  , formData  }) => {
                return {
                    url: `${url}/store/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Size'],
        }),
    })
});
export const { 
     useGetAllProductSizeQuery,    
     useDeleteProductSizeMutation,
     useAddNewProductSizeMutation,    
    } =  productSizeApi;