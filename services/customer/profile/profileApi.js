import { baseApi } from '@/services/baseApi';

const url = '/customer/profile';

export const  profileApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
      updateProfile: builder.mutation({
        query: ( formData ) => {

            return {
                url: `${url}/profile/update`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Profile'],
    }),
   
    getProvince: builder.query({
        query: () => {
            return {
                url: `${url}/province`,
            }
        },
        providesTags: ['Profile'],
    }),

    getOrders: builder.query({
        query: (arg) => {
            const { type  } = arg;
            return {
                url: type === null ? `${url}/orders` : `${url}/orders?type=${type}`,
            }
        },
        providesTags: ['Profile'],
    }),

    getDetailOrder: builder.query({
        query: (id) => `${url}/orders/detail/${id}`,

        invalidatesTags: ['Profile']
    }),
    getShowOrder: builder.query({
        query: (id) => `${url}/orders/show/${id}`,

        invalidatesTags: ['Profile']
    }),

    deleteFavorite: builder.mutation({
        query(id) {
            return {
                url: `${url}/favorite/delete/${id}`,
                method: 'DELETE',
            }
        },
        invalidatesTags: ['Profile'],

    }),
   
     getAllTickets: builder.mutation({
        query: ( ) => {
            return {
                url: `${url}/my-tickets`,  
            }
        },
        providesTags: ['Profile'],
    }),
  
    getPriorityAndCategory: builder.mutation({
        query: ( ) => {
          
            return {
                url: `${url}/my-tickets/create`,  
            }
        },
        providesTags: ['Profile'],

    }),
    getTicket: builder.mutation({
        query: (id) => {
            return {
                url: `${url}/my-tickets/show/${id}`,  
            }
        },
        providesTags: ['Profile'],
    }),
    
    changeTicket: builder.mutation({
        query: (id) => {   
            return {
                url: `${url}/my-tickets/change/${id}`,  
            }
        },
        providesTags: ['Profile'],
    }),

    answerTicket: builder.mutation({
        query: ({formData ,id}) => {
            return {
                url: `${url}/my-tickets/answer/${id}`,
                method: 'POST',
                body:  formData,
            }
        },
        invalidatesTags: ['Profile'],

    }),

    addNewTicket: builder.mutation({
        query: (formData) => {
            return {
                url: `${url}/my-tickets/store`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Profile'],
    }),
    }),
    overrideExisting: false,

});
export const { 
        useUpdateProfileMutation,
        useGetProvinceQuery,
        useGetOrdersQuery,
        useGetDetailOrderQuery,
        useGetShowOrderQuery,
        useDeleteFavoriteMutation,
        useAddNewTicketMutation,
        useChangeTicketMutation,
        useGetAllTicketsMutation,         
        useGetPriorityAndCategoryMutation,
        useGetTicketMutation,
        useAnswerTicketMutation,   
    } = profileApi;