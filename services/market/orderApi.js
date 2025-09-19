 
import { baseApi } from '../baseApi';



export const  orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),

        getNewOrders: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/newOrders/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
       
        getSendingOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/sending/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        getUnpaindOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/unpaind/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        getCanceledOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/canceled/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
    

        }),
        getReturnOrder: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/order/returned/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Order'],
        }),
        changeSendStatus: builder.mutation({
            query: (id) => `/market/order/changeSendStatus/${id}`,

            invalidatesTags: ['Order']
        }),
        changeOrderStatus: builder.mutation({
            query: (id) => `/market/order/changeOrderStatus/${id}`,

            invalidatesTags: ['Order']
        }),
       
        cancelOrder: builder.mutation({
            query: (id) => `/market/order/cancelOrder/${id}`,

            invalidatesTags: ['Order']
        }),
          
        getDetailOrder: builder.query({
            query: (id) => {
                return {
                    url: `/market/order/detailOrder/${id}`,
                }
            },
            providesTags: ['Order'],
        }),

        show: builder.query({
            query: (id) => {

                return {
                    url: `/market/order/show/${id}`,
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


        
 