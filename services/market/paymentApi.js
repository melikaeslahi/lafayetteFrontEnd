import { baseApi } from '../baseApi';

export const  paymentApi = baseApi.injectEndpoints({
  
    endpoints: (builder) => ({
  
        getAllPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/payment/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),

        getOfflinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/payment/offline/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
       
        getOnlinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/payment/online/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
        getCashPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/payment/cash/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
        canceledPayment: builder.mutation({
            query: (id) => `/market/payment/canceled/${id}`,

            invalidatesTags: ['Payment']
        }),
        returnedPayment: builder.mutation({
            query: (id) => `/market/payment/returned/${id}`,

            invalidatesTags: ['Payment']
        }),
       
        getPayment: builder.query({
            query: (id) => {
                return {
                    url: `show/${id}`,
                }
            },
            providesTags: ['Payment'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllPaymentQuery,
        useGetOfflinePaymentQuery,
        useGetOnlinePaymentQuery,
        useGetCashPaymentQuery,
        useGetPaymentQuery,
        useReturnedPaymentMutation,
        useCanceledPaymentMutation,

    } =  paymentApi;