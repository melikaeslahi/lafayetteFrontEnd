import React from "react"
import ResponseError from "./ResponseError"
 
const { default: TableLoading } = require("./Table/TableLoading")

const QueryStatusHandler = ({ isSuccess , isError, isLoading, children })=>{
    if(isLoading) return <TableLoading />
    if(isError) return <ResponseError />  
    if(isSuccess) return children;
}
export default QueryStatusHandler;