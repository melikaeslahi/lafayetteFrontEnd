import { baseApi } from '../baseApi';

const url = 'admin/content/faq';

export const  faqApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
    
        getAllFaqs: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['FAQ'],
        }),
        changeFaqStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['FAQ']
        }),
        deleteFaq: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',          
                }
            },
            invalidatesTags: ['FAQ'],
        }),
        
        addNewFaq: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['FAQ'],
        }),

        updateFaq: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['FAQ'],
        }),
       
        getFaq: builder.query({
            query: (id) => {
                return {
                    url: `${url}/faq/${id}`,
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