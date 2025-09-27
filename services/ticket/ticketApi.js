import { baseApi } from '../baseApi';

const url= '/admin/ticket';

export const  ticketApi = baseApi.injectEndpoints({
     
    endpoints: (builder) => ({
  
        getAllTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/all/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
        }),

        getNewTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/newTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
        }),
       
        getOpenTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/openTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
        }),
        getCloseTickets: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/closeTickets/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Ticket'],
        }),
        addNewAnswer: builder.mutation({
            query: ({formData  , id}) => {
                return {
                    url: `${url}/answer/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Ticket'],
        }),
        
        change: builder.mutation({
            query: (id) => `${url}/change/${id}`,

            invalidatesTags: ['Ticket']
        }),

        getTicket: builder.query({
            query: (id) => {
                return {
                    url: `${url}/show/${id}`,
                }
            },
            providesTags: ['Ticket'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllTicketsQuery,
        useGetNewTicketsQuery,
        useAddNewAnswerMutation,
        useGetOpenTicketsQuery,
        useGetCloseTicketsQuery,
        useChangeMutation,
        useGetTicketQuery,

    } =  ticketApi;