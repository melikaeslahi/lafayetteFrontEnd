import { baseApi } from '../baseApi';



export const  deliveryApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getAllDelivery: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/delivery/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Delivery'],
        }),
       
        deleteDelivery: builder.mutation({
            query(id) {
                return {
                    url: `/market/delivery/delete/${id}`,
                    method: 'DELETE',   
                }
            },
            invalidatesTags: ['Delivery'],
        }),
       
        
        addNewDelivery: builder.mutation({
            query: (payload) => {
                return {
                    url: `/market/delivery/store`,
                    method: 'POST',

                    body: payload,
                    FormData: true,
                    credentials: 'include',
                }
            },
            invalidatesTags: ['Delivery'],
        }),

        updateDelivery: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/market/delivery/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Delivery'],
        }),
        
        getDelivery: builder.query({
            query: (id) => {
                return {
                    url: `/market/delivery/delivery/${id}`,
                }
            },
            providesTags: ['Delivery'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllDeliveryQuery,
        useDeleteDeliveryMutation,
        useAddNewDeliveryMutation,
        useUpdateDeliveryMutation,
        useGetDeliveryQuery,
        
    } =  deliveryApi;