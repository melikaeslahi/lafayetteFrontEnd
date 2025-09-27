import { baseApi } from '../baseApi';

const url = '/admin/market/order'

export const  orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),

        getNewOrders: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
       
        getSendingOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/sending/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        getUnpaindOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/unpaind/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        getCanceledOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/canceled/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        getReturnOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/returned/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        changeSendStatus: builder.mutation({
            query: (id) => `${url}/changeSendStatus/${id}`,

            invalidatesTags: ['Order']
        }),
        changeOrderStatus: builder.mutation({
            query: (id) => `${url}/changeOrderStatus/${id}`,

            invalidatesTags: ['Order']
        }),
       
        cancelOrder: builder.mutation({
            query: (id) => `${url}/cancelOrder/${id}`,

            invalidatesTags: ['Order']
        }),
          
        getDetailOrder: builder.query({
            query: (id) => {
                return {
                    url: `${url}/detailOrder/${id}`,
                }
            },
            providesTags: ['Order'],
        }),

        show: builder.query({
            query: (id) => {

                return {
                    url: `${url}/show/${id}`,
                }
            },
            providesTags: ['Order'],
        }),

    }),
    overrideExisting: false,

});
export const { 
        useGetAllOrderQuery,
        useGetNewOrdersQuery,
        useGetSendingOrderQuery,
        useGetUnpaindOrderQuery,
        useGetCanceledOrderQuery,
        useGetReturnOrderQuery,
        useChangeSendStatusMutation,
        useChangeOrderStatusMutation,
        useCancelOrderMutation,
        useGetDetailOrderQuery,
        useShowQuery,

    } =  orderApi;


        
 