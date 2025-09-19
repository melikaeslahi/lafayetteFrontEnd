import { baseApi } from '../baseApi';

const url = 'admin/content/slider';

export const  sliderApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
    
        getAllSlider: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Slider'],
      

        }),
        changeSliderStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Slider']
        }),
        deleteSlider: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',        
                }
            },
            invalidatesTags: ['Slider'],

        }),
       
        addNewProducts: builder.mutation({
            query: ({formData , params}) => {
                return {
                    url: `${url}/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Slider'],

        }),
        addNewSlider: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,      
                }
            },
            invalidatesTags: ['Slider'],

        }),

        updateSlider: builder.mutation({
            query: ({ id, formData }) => {

                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Slider'],

        }),
        
        getSlider: builder.query({
            query: (id) => {

                return {
                    url: `${url}/show/${id}`,
                }
            },
            providesTags: ['Slider'],
        }),
      
 

        getProducts: builder.query({
            query: (id) => {
                return {
                    url: `${url}/products/${id}`,
                }
            },
            providesTags: ['Slider'],
        }),
      
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `${url}/parentId`,
                }
            },
            providesTags: ['Slider'],
        }),
    }),
    overrideExisting: false,
});
export const { 
   //postcategory
    useGetAllSliderQuery,
      useChangeSliderStatusMutation,
       useDeleteSliderMutation,
        useAddNewSliderMutation,
        useAddNewProductsMutation,
        useUpdateSliderMutation,
        useGetAllParentIdQuery,
        useGetSliderQuery,
        useGetProductsQuery,

 
    
    
    } =  sliderApi;


        
// export const {
//     useGetAllPostCategoryQuery,
//     useChangePostCategoryStatusMutation,
//     useDeletePostCategoryMutation,
   
//     useAddNewPostCategoryMutation,
//     useUpdatePostCategoryMutation,
//     useGetAllParentIdQuery,
//     useGetCategoryQuery,
//     util: { getRunningQueriesThunk },
// } = apiSlice;

// export const { getAllPostCategory,changePostCategoryStatus,getCategory ,getAllParentId,updatePostCategory,addNewPostCategory, deletePostCategory } = apiSlice.endpoints;