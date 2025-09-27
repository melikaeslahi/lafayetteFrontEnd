import { baseApi } from '../baseApi';

const url = '/admin/market/payment';

export const  paymentApi = baseApi.injectEndpoints({
  
    endpoints: (builder) => ({
  
        getAllPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),

        getOfflinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/offline/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
       
        getOnlinePayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/online/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
        getCashPayment: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/cash/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Payment'],
        }),
        canceledPayment: builder.mutation({
            query: (id) => `${url}/canceled/${id}`,

            invalidatesTags: ['Payment']
        }),
        returnedPayment: builder.mutation({
            query: (id) => `${url}/returned/${id}`,

            invalidatesTags: ['Payment']
        }),
       
        getPayment: builder.query({
            query: (id) => {
                return {
                    url: `${url}/show/${id}`,
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