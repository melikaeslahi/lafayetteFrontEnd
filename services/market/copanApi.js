import { baseApi } from '../baseApi';


export const   copanApi =  baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
  
        getAllCopan: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/discount/copan/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Copan'],
        }),
         
        deleteCopan: builder.mutation({
            query(id) {
                return {
                    url: `/market/discount/copan/delete/${id}`,
                    method: 'DELETE',        
                }
            },
            invalidatesTags: ['Copan'],
        }),
       
        addNewCopan: builder.mutation({
            query: (formData) => {
                return {
                    url: `/market/discount/copan/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Copan'],
        }),

        updateCopan: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/market/discount/copan/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Copan'],
        }),
        getUsers: builder.query({
            query: () => {
                return {
                    url: `//market/discount/copan/users`,
                }
            },
            providesTags: ['Copan'],
        }),
        getCopan: builder.query({
            query: (id) => {
                return {
                    url: `/market/discount/copan/copan/${id}`,
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