import { baseApi } from '../baseApi';


export const  categoryAttributeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllAttribute: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/market/property/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Attribute'],
        }),
       
        
        deleteAttribute: builder.mutation({
            query(id) {
                return {
                    url: `/market/property/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['Attribute'],

        }),
     
        addNewAttribute: builder.mutation({
            query: (formData) => {
                return {
                    url: `/market/property/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Attribute'],
        }),

        updateAttribute: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/market/property/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Attribute'],
        }),
       
        getAttribute: builder.query({
            query: (id) => {
                return {
                    url: `/market/property/attribute/${id}`,
                }
            },
            providesTags: ['Product'],
          
        }),
 
         getCategories: builder.query({
            query: () => {
                return {
                    url: `/market/property/category/`,
                }
            },
            providesTags: ['Product'],   
        }),
    }),
    overrideExisting: false,

});
export const { 
        useGetAllAttributeQuery,
        useDeleteAttributeMutation,
        useAddNewAttributeMutation,
        useUpdateAttributeMutation,
        useGetCategoriesQuery,
        useGetAttributeQuery,
    } =  categoryAttributeApi;
