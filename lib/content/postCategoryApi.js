// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 

// function getCookie(name) {
//     if (typeof document === 'undefined') return undefined;
//     const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
//     return match ? decodeURIComponent(match[1]) : undefined;
//   }

// export const  postCategoryApi = createApi({
//     reducerPath: 'postCategoryApi',
//     baseQuery: fetchBaseQuery({ 
//         baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/content/category/`,
//         credentials: 'include',
//         prepareHeaders: (headers, { extra }) => {
//         headers.set('Accept' , 'application/json');
//         const xsrf = getCookie('XSRF-TOKEN');
//         if (xsrf) headers.set('X-XSRF-TOKEN', xsrf);
//          return headers
//        },
// }),
   
//     tagTypes: ['PostCategory'],



//     endpoints: (builder) => ({
       
//         getCsrf:builder.query({
//             query:()=>`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`
//            }),

//         getAllPostCategory: builder.query({
//             query: (arg) => {
//                 const { page = 1, perPage = 0, search } = arg;
//                 return {
//                     url: `${perPage}/${search}`,
//                     params: { page },
//                 }
//             },
//             providesTags: ['PostCategory'],
      

//         }),
//         changePostCategoryStatus: builder.mutation({
//             query: (id) => `status/${id}`,

//             invalidatesTags: ['PostCategory']
//         }),
//         deletePostCategory: builder.mutation({
//             query(id) {
//                 return {
//                     url: `delete/${id}`,
//                     method: 'DELETE',           
//                 }
//             },
//             invalidatesTags: ['PostCategory'],

//         }),
       
      
//         addNewPostCategory: builder.mutation({
//             query: (body) => {
//                 return {
//                     url: `store`,
//                     method: 'POST',
//                     body,          
//                 }
//             },
//             invalidatesTags: ['PostCategory'],

//         }),

//         updatePostCategory: builder.mutation({
//             query: ({ id, formData }) => {

//                 return {
//                     url: `update/${id}`,
//                     method: 'POST',

//                     body: formData,


//                 }
//             },
//             invalidatesTags: ['PostCategory'],

//         }),
//         getAllParentId: builder.query({
//             query: () => {

//                 return {
//                     url: `parentId`,

//                 }
//             },
//             providesTags: ['PostCategory'],
       

//         }),
//         getCategory: builder.query({
//             query: (id) => {

//                 return {
//                     url: `category/${id}`,

//                 }
//             },
//             providesTags: ['PostCategory'],
         

//         }),

//     })
// });
// export const { 
//     useGetAllPostCategoryQuery,
//     useChangePostCategoryStatusMutation,
//     useDeletePostCategoryMutation,   
//     useAddNewPostCategoryMutation,
//     useUpdatePostCategoryMutation,
//     useGetAllParentIdQuery,
//     useGetCategoryQuery,    
//     } =  postCategoryApi;

