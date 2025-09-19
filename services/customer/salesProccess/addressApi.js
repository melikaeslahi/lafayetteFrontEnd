import { baseApi } from '@/services/baseApi';

const url = '/customer/salesProccess';

export const  addressApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
  
     getAddressAndDelivery: builder.query({
        query: () => {      
            return {
                url: `${url}/address-and-delivery`,
            }
        },
        providesTags: ['Address'],
    }),
   
    addAddress: builder.mutation({
        query: (payload) => {
            return {
                url: `${url}/add-address`,
                method: 'POST',
                body: payload,
            }
        },
        invalidatesTags: ['Address'],

    }),

    updateAddress: builder.mutation({
        query: ( {formData , id }) => {
            return {
                url: `${url}/update-address/${id}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Address'],

    }),

    getCities: builder.mutation({
        query: (id) => `${url}/get-cities/${id}`,

        invalidatesTags: ['Address']
    }),

     chooseAddressAndDelivery: builder.mutation({
        query: (formData) => {

            return {
                url: `${url}/choose-address-and-delivery`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Address'],
    }),
    }),
    overrideExisting: false,

});
export const { 
        useUpdateAddressMutation,
        useGetAddressAndDeliveryQuery,
        useAddAddressMutation,
        useChooseAddressAndDeliveryMutation, 
        useGetCitiesMutation,         
    } = addressApi;