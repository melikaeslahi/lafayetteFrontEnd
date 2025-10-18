import { apiFetch } from "../api";

export async function getAll(resorces){
   return apiFetch(`/${resorces}`);
};

export async function getOne(resorces , id){
    return apiFetch(`/${resorces}/${id}`);
 };