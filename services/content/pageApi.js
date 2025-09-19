import { baseApi } from '../baseApi';

const url = 'admin/content/page'

export const  pageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
        getAllPage: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Page'],
        }),
        changePageStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Page']
        }),
        deletePage: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',          
                }
            },
            invalidatesTags: ['Page'],
        }),
        addNewPage: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Page'],

        }),

        updatePage: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Page'],

        }),
        
        getPage: builder.query({
            query: (id) => {
                return {
                    url: `${url}/page/${id}`,
                }
            },
            providesTags: ['Page'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllPageQuery,
        useChangePageStatusMutation,
        useDeletePageMutation, 
        useAddNewPageMutation,
        useUpdatePageMutation,
        useGetPageQuery,    
    } =  pageApi;