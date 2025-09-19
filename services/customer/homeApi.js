import { baseApi } from '../baseApi';

const url = 'customer';

export const  homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
     getHomeData: builder.query({
        query: () => {
            return {
                url: `${url}/`,
            }
        },
        providesTags: ['home'],
    }),
     
    getProducts: builder.mutation({
        query: () => {
            return {   
                url:`${url}/products`, 
                method:'GET',
            }
        },
        providesTags: ['home'],

    }),

     setFiltering: builder.mutation({
        query: ({formData , category =null }) => {
            return {
                url:`${url}/products`, 
                params:{category},
                method:'POST',
                body:formData       
            }
        },
        providesTags: ['home'],
    }),
     
    getPage: builder.mutation({
        query: (slug) => {     
            return {            
                url:`${url}/page/${slug}`, 
                method:'GET',         
            }
        },
        providesTags: ['home'],
    }),

    getPages: builder.query({
        query: () => {  
            return {   
                url:`${url}/pages`, 
                method:'GET',           
            }
        },
        providesTags: ['home'],
    }),
    getFaqs: builder.query({
        query: () => {  
            return {   
                url:`${url}/faqs`, 
                method:'GET',        
            }
        },
        providesTags: ['home'],
    }),
    getMenus: builder.query({
        query: () => {  
            return {   
                url:`${url}/menus`, 
                method:'GET',   
            }
        },
        providesTags: ['home'],
    }),
  }),
  overrideExisting: false,
});
export const { 
        useGetHomeDataQuery,
        useGetProductsMutation,
        useSetFilteringMutation,
        useGetPagesQuery,
        useGetPageMutation,
        useGetFaqsQuery,
        useGetMenusQuery,
    } = homeApi;