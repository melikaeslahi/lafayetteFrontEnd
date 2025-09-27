import { baseApi } from '../baseApi';

const url = '/admin/market/product/colors'

export const  productColorApi =  baseApi.injectEndpoints({
 
    endpoints: (builder) => ({
  
        getAllProductColor: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0 ,params, search  } = arg;
                return {
                    url: `${url}/${perPage}/${params}/${search}`   ,
                    params: { page },
                }
            },
            providesTags: ['Color'],
        }),
       
        deleteProductColor: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',         
                }
            },
            invalidatesTags: ['Color'],
        }),
     
        addNewProductColor: builder.mutation({
            query: ({ params  , formData  }) => {
                return {
                    url: `${url}/store/${params}`,
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