import { getAll, getOne } from "../ crud";

const url =  `admin/content/category`;

export const getPostCategories =(params , perPage , search)=> getAll(`${url}/${perPage}/${search}?${params}`);
export const getPostCategory=(id)=>getOne(`${url}/${id}`);