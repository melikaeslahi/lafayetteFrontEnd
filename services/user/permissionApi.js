import { baseApi } from '../baseApi';

const url = '/admin/user/permission';

export const  permissionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
  
        getAllPermission: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Permission'],
        }),
       
        deletePermission: builder.mutation({
            query(id) {
                return {
                    url: `${url}/delete/${id}`,
                    method: 'DELETE',    
                }
            },
            invalidatesTags: ['Permission'],
        }),
       
        
        addNewPermission: builder.mutation({
            query: (payload) => {
                return {
                    url: `${url}/store`,
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Permission'],
        }),

        updatePermission: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Permission'],
        }),
        
        getPermission: builder.query({
            query: (id) => {
                return {
                    url: `${url}/permission/${id}`,
                }
            },
            providesTags: ['Permission'],
        }),
    }),
    overrideExisting: false,
});
export const { 
        useGetAllPermissionQuery,
        useDeletePermissionMutation,
        useAddNewPermissionMutation,
        useUpdatePermissionMutation,  
        useGetPermissionQuery,
    } =  permissionApi;