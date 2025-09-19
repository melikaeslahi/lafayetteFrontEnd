import { baseApi } from '@/services/baseApi';

const url = 'customer/market/'

export const  marketProductApi =  baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
      
      getProduct: builder.mutation({
        query: (slug) => {

            return {
                url: `${url}/product/${slug}`,
            }
        },
        providesTags: ['MarketProduct'],
    }),

    addComment: builder.mutation({
        query: ({formData , slug}) => {
            return {
                url: `${url}/add-comment/product/${slug}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['MarketProduct'],
    }),

    addToFavorite: builder.mutation({
        query: (slug) => {
            return {
                url: `${url}/add-to-favorite/product/${slug}`,
            }
        },
        invalidatesTags: ['MarketProduct'],
      }),
    }),
    overrideExisting: false,
});
export const { 
        useGetProductMutation,
        useAddCommentMutation,
        useAddToFavoriteMutation,
    } = marketProductApi;