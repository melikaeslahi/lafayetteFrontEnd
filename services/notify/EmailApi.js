import { baseApi } from '../baseApi';

const url= '/admin/notify/email';

export const  EmailApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllEmail: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Email'],
        }),
        changeEmailStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Email']
        }),
      
        deleteEmail: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Email'],
        }),
       
        addNewEmail: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Email'],

        }),

        updateEmail: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Email'],

        }),
       
        getEmail: builder.query({
            query: (id) => {
                return {
                    url: `${url}/email/${id}`,
                }
            },
            providesTags: ['Email'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllEmailQuery,
        useChangeEmailStatusMutation,
        useDeleteEmailMutation,
        useAddNewEmailMutation,
        useUpdateEmailMutation,   
        useGetEmailQuery,
       
    } =  EmailApi;