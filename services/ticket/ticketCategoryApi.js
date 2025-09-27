import { baseApi } from '../baseApi';

const url = '/admin/ticket/category';

export const  ticketCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllTicketCategory: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['TicketCategory'],
    

        }),
        changeTicketCategoryStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['TicketCategory']
        }),
       
        deleteTicketCategory: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',            
                }
            },
            invalidatesTags: ['TicketCategory'],
        }),
       
        addNewTicketCategory: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['TicketCategory'],
        }),

        updateTicketCategory: builder.mutation({
            query: ({ params, formData }) => {

                return {
                    url: `${url}/update/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['TicketCategory'],
        }),
      
        getTicketCategory: builder.query({
            query: (id) => {
                return {
                    url: `${url}/ticketCategory/${id}`,
                }
            },
            providesTags: ['TicketCategory'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllTicketCategoryQuery,
        useChangeTicketCategoryStatusMutation,
        useDeleteTicketCategoryMutation,
        useAddNewTicketCategoryMutation,
        useUpdateTicketCategoryMutation,
        useGetTicketCategoryQuery,
    } =  ticketCategoryApi;