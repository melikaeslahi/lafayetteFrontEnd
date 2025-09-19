import { baseApi } from '@/services/baseApi';

 const url ='customer/salesProccess';

export const  profileCompletionApi =  baseApi.injectEndpoints({
 
    endpoints: (builder) => ({   
     getProfileCompletion: builder.query({
        query: () => {
            return {
                url: `${url}/profile-completion`,
            }
        },
        providesTags: ['ProfileCompletion'],
    }),
 
    updateProfileCompletion: builder.mutation({
        query: (formData) => {
            return {
                url: `${url}/profile-completion/update`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['ProfileCompletion'],
     }),
    }),
    overrideExisting: false,
});
export const { 
        useUpdateProfileCompletionMutation,
        useGetProfileCompletionQuery,
    } = profileCompletionApi;