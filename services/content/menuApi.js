import { baseApi } from '../baseApi';

const url = 'admin/content/menus'

export const  menuApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
        getAllMenus: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Menu'],
        }),
        changeMenuStatus: builder.mutation({
            query: (id) => `${url}/status/${id}`,

            invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['Menu'],
        }),
       
        addNewMenu: builder.mutation({
            query: (formData) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Menu'],
        }),

        updateMenu: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Menu'],
        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `${url}/parentId`,
                }
            },
            providesTags: ['Menu'],
        }),
        getMenu: builder.query({
            query: (id) => {
                return {
                    url: `${url}/menu/${id}`,
                }
            },
            providesTags: ['Menu'],
        }),
    })
});
export const { 
      useGetAllMenusQuery,
      useChangeMenuStatusMutation,
      useDeleteMenuMutation, 
      useAddNewMenuMutation,
      useUpdateMenuMutation,
      useGetAllParentIdQuery,
      useGetMenuQuery,    
    } =  menuApi;
