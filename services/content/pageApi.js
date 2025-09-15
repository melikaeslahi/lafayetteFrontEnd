import { baseApi } from '../baseApi';

export const  pageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
        getAllPage: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/content/page/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Page'],
        }),
        changePageStatus: builder.mutation({
            query: (id) => `/content/page/status/${id}`,

            invalidatesTags: ['Page']
        }),
        deletePage: builder.mutation({
            query(id) {
                return {
                    url: `/content/page/delete/${id}`,
                    method: 'DELETE',          
                }
            },
            invalidatesTags: ['Page'],
        }),
        addNewPage: builder.mutation({
            query: (formData) => {
                return {
                    url: `/content/page/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Page'],

        }),

        updatePage: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `/content/page/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Page'],

        }),
        
        getPage: builder.query({
            query: (id) => {
                return {
                    url: `/content/page/page/${id}`,
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