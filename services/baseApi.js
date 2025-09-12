import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getCookie(name) {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : undefined;
  }

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin`,
        credentials: 'include',
        prepareHeaders: (headers) => {
        headers.set('Accept' , 'application/json');
        const xsrf = getCookie('XSRF-TOKEN');
        if (xsrf) headers.set('X-XSRF-TOKEN', xsrf);
         return headers
       },
    }),
    tagTypes: ['PostCategory'],

    endpoints: (builder) => ({
       
        getCsrf:builder.query({
            query:()=>`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`
           }),
        })
})
 

export const {useGetCsrfQuery} = baseApi;