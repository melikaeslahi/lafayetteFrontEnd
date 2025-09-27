import { baseApi } from '../baseApi';

const url = '/admin/ticket/admin';

export const  ticketAdminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllTicketAdmin: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['TicketAdmin'],
        }),
        changeTicketAdminStatus: builder.mutation({
            query: (id) => `set/${id}`,

            invalidatesTags: ['TicketAdmin']
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllTicketAdminQuery,
        useChangeTicketAdminStatusMutation,
    } =  ticketAdminApi;