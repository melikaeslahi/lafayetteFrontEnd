import { baseApi } from "../baseApi";


export const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
     getAllBanner: builder.query({
        query: (arg) => {
            const { page = 1, perPage = 0, search } = arg;
            return {
                url: `/content/banner/${perPage}/${search}`,
                params: { page },
            }
        },
        providesTags: ['Banner'],
    }),

    changeBannerStatus: builder.mutation({
        query: (id) => `/content/banner/status/${id}`,
        invalidatesTags: ['Banner']
    }),

    deleteBanner: builder.mutation({
        query(id) {
            return {
                url: `/content/banner/delete/${id}`,
                method: 'DELETE',    
            }
        },
        invalidatesTags: ['Banner'],
    }),
   
    addNewBanner: builder.mutation({
        query: (formData) => {
            return {
                url: `/content/banner/store`,
                method: 'POST',
                body:formData,
            }
        },
        invalidatesTags: ['Banner'],
    }),

    updateBanner: builder.mutation({
        query: ({ id, formData }) => {
            return {
                url: `/content/banner/update/${id}`,
                method: 'POST',
                body: formData,
            }
        },
        invalidatesTags: ['Banner'],
    }),
 
    getBanner: builder.query({
        query: (id) => {
            return {
                url: `/content/banner/banner/${id}`,
            }
        },
        providesTags: ['Banner'],
    }),

    getPositions: builder.query({
        query :() => 'content/banner/position' 
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