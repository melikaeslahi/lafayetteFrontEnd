import { baseApi } from '../baseApi';

export const  productColorApi =  baseApi.injectEndpoints({
 
    endpoints: (builder) => ({
  
        getAllProductColor: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 ,params, search  } = arg;
                return {
                    url: `/market/product/colors/${perPage}/${params}/${search}`   ,
                    params: { page },
                }
            },
            providesTags: ['Color'],
        }),
       
        deleteProductColor: builder.mutation({
            query(id) {
                return {
                    url: `/market/product/colors/delete/${id}`,
                    method: 'DELETE',         
                }
            },
            invalidatesTags: ['Color'],
        }),
     
        addNewProductColor: builder.mutation({
            query: ({ params  , formData  }) => {
                return {
                    url: `/market/product/colors/store/${params}`,
                    method: 'POST',
                    body: formData,    
                }
            },
            invalidatesTags: ['Color'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllProductColorQuery,        
        useDeleteProductColorMutation,
        useAddNewProductColorMutation,
        
    } =  productColorApi;