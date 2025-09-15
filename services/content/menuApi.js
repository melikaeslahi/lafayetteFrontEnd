import { baseApi } from '../baseApi';

export const  menuApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
        getAllMenus: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `/content/menus/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Menu'],
        }),
        changeMenuStatus: builder.mutation({
            query: (id) => `status/${id}`,

            invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation({
            query(id) {
                return {
                    url: `/content/menus/delete/${id}`,
                    method: 'DELETE',           
                }
            },
            invalidatesTags: ['Menu'],
        }),
       
        addNewMenu: builder.mutation({
            query: (formData) => {
                return {
                    url: `/content/menus/store`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Menu'],
        }),

        updateMenu: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `/content/menus/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Menu'],
        }),
        getAllParentId: builder.query({
            query: () => {
                return {
                    url: `/content/menus/parentId`,
                }
            },
            providesTags: ['Menu'],
        }),
        getMenu: builder.query({
            query: (id) => {
                return {
                    url: `/content/menus/menu/${id}`,
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
