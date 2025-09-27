import { baseApi } from '../baseApi';

const url ='/admin/ticket/priority';

export const  ticketPriorityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllTicketPriority: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['TicketPriority'],
        }),
        changeTicketPriorityStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['TicketPriority']
        }),
    
        deleteTicketPriority: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',            
                }
            },
            invalidatesTags: ['TicketPriority'],
        }),
    
        addNewTicketPriority: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['TicketPriority'],
        }),

        updateTicketPriority: builder.mutation({
            query: ({ formData , params }) => {
                return {
                    url: `${url}/update/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['TicketPriority'],
        }),
     
        getTicketPriority: builder.query({
            query: (id) => {
                return {
                    url: `${url}/ticketPriority/${id}`,
                }
            },
            providesTags: ['TicketPriority'],
        }),
    }),

});
export const { 
        useGetAllTicketPriorityQuery,
        useChangeTicketPriorityStatusMutation,
        useDeleteTicketPriorityMutation,
        useAddNewTicketPriorityMutation,
        useUpdateTicketPriorityMutation,
        useGetTicketPriorityQuery,
    } =  ticketPriorityApi;