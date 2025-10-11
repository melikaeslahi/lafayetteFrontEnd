import { baseApi } from '../baseApi';

const url = '/admin/user/customer';

export const  customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllCustomer: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Customer'],
    

        }),
        changeCustomerStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Customer']
        }),
        changeCustomerActivation: builder.mutation({
            query: (id) => `${url}/showInMenu/${id}`,

            invalidatesTags: ['Customer']
        }),
        deleteCustomer: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',

                    // credentials:'include',            
                }
            },
            invalidatesTags: ['Customer'],

        }),
       
        
        addNewCustomer: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Customer'],
        }),

        updateCustomer: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Customer'],
        }),
        
        getCustomer: builder.query({
            query: (id) => {

                return {
                    url: `${url}/customer/${id}`,
                }
            },
            providesTags: ['Customer'],
        }),
    }),
});
export const { 
        useGetAllCustomerQuery,
        useChangeCustomerStatusMutation,
        useDeleteCustomerMutation,
        useAddNewCustomerMutation,
        useUpdateCustomerMutation,  
        useGetCustomerQuery,
        useChangeCustomerActivationMutation
    } =  customerApi;