import { baseApi } from '../baseApi';

const url = "admin/market/discount/copan";

export const   copanApi =  baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
  
        getAllCopan: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Copan'],
        }),
         
        deleteCopan: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',        
                }
            },
            invalidatesTags: ['Copan'],
        }),
       
        addNewCopan: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Copan'],
        }),

        updateCopan: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Copan'],
        }),
        getUsers: builder.query({
            query: () => {
                return {
                    url: `${url}/users`,
                }
            },
            providesTags: ['Copan'],
        }),
        getCopan: builder.query({
            query: (id) => {
                return {
                    url: `${url}/copan/${id}`,
                }
            },
            providesTags: ['Copan'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllCopanQuery,    
        useDeleteCopanMutation,
        useAddNewCopanMutation,
        useUpdateCopanMutation,
        useGetUsersQuery,
        useGetCopanQuery,
    } =  copanApi;