import { baseApi } from '../baseApi';

const url = "/admin/market/property"

export const  categoryAttributeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllAttribute: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Attribute'],
        }),
       
        
        deleteAttribute: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['Attribute'],

        }),
     
        addNewAttribute: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Attribute'],
        }),

        updateAttribute: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Attribute'],
        }),
       
        getAttribute: builder.query({
            query: (id) => {
                return {
                    url: `${url}/attribute/${id}`,
                }
            },
            providesTags: ['Product'],
          
        }),
 
         getCategories: builder.query({
            query: () => {
                return {
                    url: `${url}/category/`,
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
