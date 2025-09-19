import { baseApi } from '../baseApi';


export const  galleryApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
  
        getAllGallery: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0  , params} = arg;
                return {
                    url: `/market/product/gallery/${perPage}/${params}`,
                    params: { page },
                }
            },
            providesTags: ['Gallery'],
        }),
        
        deleteGallery: builder.mutation({
            query(id) {
                return {
                    url: `/market/product/gallery/delete/${id}`,
                    method: 'DELETE',         
                }
            },
            invalidatesTags: ['Gallery'],
        }),
       
        addNewGallery: builder.mutation({
            query: ({  params,  formData  }) => {
                return {
                    url: `/market/product/gallery/store/${params}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Gallery'],
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllGalleryQuery,       
        useDeleteGalleryMutation,
        useAddNewGalleryMutation,  
    } =  galleryApi;
