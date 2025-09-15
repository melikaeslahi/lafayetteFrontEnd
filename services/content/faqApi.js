import { baseApi } from '../baseApi';

export const  faqApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
    
        getAllFaqs: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `content/faq/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['FAQ'],
        }),
        changeFaqStatus: builder.mutation({
            query: (id) => `content/faq/status/${id}`,

            invalidatesTags: ['FAQ']
        }),
        deleteFaq: builder.mutation({
            query(id) {
                return {
                    url: `content/faq/delete/${id}`,
                    method: 'DELETE',          
                }
            },
            invalidatesTags: ['FAQ'],
        }),
        
        addNewFaq: builder.mutation({
            query: (formData) => {
                return {
                    url: `content/faq/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['FAQ'],
        }),

        updateFaq: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `content/faq/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['FAQ'],
        }),
       
        getFaq: builder.query({
            query: (id) => {
                return {
                    url: `content/faq/faq/${id}`,
                }
            },
            providesTags: ['FAQ'],
        }),
    }),
    overrideExisting: false,
});
export const { 
 
        useGetAllFaqsQuery,
        useChangeFaqStatusMutation,
        useDeleteFaqMutation,
        useAddNewFaqMutation,
        useUpdateFaqMutation,
        useGetFaqQuery,
    } =  faqApi;