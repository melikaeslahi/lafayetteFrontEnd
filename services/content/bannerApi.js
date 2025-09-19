import { baseApi } from "../baseApi";

const url='admin/content/banner';

export const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
     getAllBanner: builder.query({
        query: (arg) => {
            const { page = 1, perPage = 0, search } = arg;
            return {
                url: `${url}/${perPage}/${search}`,
                params: { page },
            }
        },
        providesTags: ['Banner'],
    }),

    changeBannerStatus: builder.mutation({
        query: (id) => `${url}/status/${id}`,
        invalidatesTags: ['Banner']
    }),

    deleteBanner: builder.mutation({
        query(id) {
            return {
                url: `${url}/content/banner/delete/${id}`,
                method: 'DELETE',    
            }
        },
        invalidatesTags: ['Banner'],
    }),
   
    addNewBanner: builder.mutation({
        query: (formData) => {
            return {
                url: `${url}/store`,
                method: 'POST',
                body:formData,
            }
        },
        invalidatesTags: ['Banner'],
    }),

    updateBanner: builder.mutation({
        query: ({ id, formData }) => {
            return {
                url: `${url}/update/${id}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Banner'],
    }),
 
    getBanner: builder.query({
        query: (id) => {
            return {
                url: `${url}/banner/${id}`,
            }
        },
        providesTags: ['Banner'],
    }),

    getPositions: builder.query({
        query :() => `${url}/position` 
    }),
}),
    overrideExisting: false,
});

export const { 
        useGetAllBannerQuery,
        useChangeBannerStatusMutation,
        useDeleteBannerMutation,
        useAddNewBannerMutation,
        useUpdateBannerMutation,         
        useGetBannerQuery,
        useGetPositionsQuery
    } = bannerApi;