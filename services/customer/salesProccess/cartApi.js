import { baseApi } from '@/services/baseApi';

const url = `customer/salesProccess`;

export const  cartApi =  baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
    
     getCart: builder.query({
        query: () => {  
            return {
                url: `${url}/cart`,       
            }
        },
        providesTags: ['CartItem'],
    }),
    
    addToCart: builder.mutation({
        query: ({formData , slug}) => {
            return {
                url: `${url}/add-to-cart/${slug}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['CartItem'],
    }),

    updateCart: builder.mutation({
        query: (formData) => {
            return {
                url: `${url}/update-cart`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['CartItem'],
    }),

     deleteCart: builder.mutation({
        query: ( id ) => {

            return {
                url: `${url}/remove-from-cart/${id}`,
                method: 'DELETE',
            }
        },
        invalidatesTags: ['CartItem'],
    }),
    }),
    overrideExisting: false,
});
export const { 
        useUpdateCartMutation,
        useGetCartQuery,
        useAddToCartMutation,
        useDeleteCartMutation,        
    } = cartApi;