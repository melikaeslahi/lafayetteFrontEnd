import { baseApi } from '../baseApi';

const url ='/admin/setting';

export const  settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSetting: builder.query({
            query: (arg) => {
                const { page = 1, perPage = 0, search } = arg;
                return {
                    url: `${url}/${perPage}/${search}`,
                    params: { page },
                }
            },
            providesTags: ['Setting'],
        }),       

        updateSetting: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `${url}/update/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['Setting'],
        }),
       
        getSetting: builder.query({
            query: (id) => {
                return {
                    url: `${url}/setting/${id}`,
                }
            },
            providesTags: ['Setting'],
        }),
    }),
});
export const { 
        useGetAllSettingQuery,
        useUpdateSettingMutation,  
        useGetSettingQuery,
    } =  settingApi;
