import { baseApi } from "@/services/baseApi";

const url = `customer/salesProccess/`;

export const  salesPaymentApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

     getPaymentData: builder.query({
        query: () => {
           
            return {
                url: `${url}/payment`,    
            }
        },
        providesTags: ['Payment'],
    }),
    
     addCopanDiscount: builder.mutation({
        query: (payload) => {
            return {
                url: `${url}/copan-discount`,
                method: 'POST',
                body: payload,
            }
        },
        invalidatesTags: ['Payment'],
    }),

     paymentSubmit: builder.mutation({
        query: (payload) => {
            return {
                url: `${url}/payment-submit`,
                method: 'POST',
                body: payload,
            }
        },
        invalidatesTags: ['Payment'],

    }),
    }),
    overrideExisting: false,
    
});
export const { 
        useGetPaymentDataQuery,
        useAddCopanDiscountMutation,
        usePaymentSubmitMutation,
    } = salesPaymentApi;