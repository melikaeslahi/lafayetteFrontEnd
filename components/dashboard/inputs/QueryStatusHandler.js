import React from "react"
import ResponseError from "./ResponseError"
import { TableLoading } from "../Table"
 
 

const QueryStatusHandler = ({ data, isLoading, children })=>{
    if(isLoading) return <TableLoading />
    if(!data?.success) return <ResponseError data={data} />  
     return children;
}
export default QueryStatusHandler;