import { useQueryStatus } from "@/hooks/useQueryStatus"
import TableNotFound from "./TableNotFound"
import React from "react"
 

const { default: TableError404 } = require("./TableError404")
const { default: TableLoading } = require("./TableLoading")

const QueryStatusHandler = ({ query , children })=>{
    const {data, isLoading , isError , isSuccess } =useQueryStatus(query);
    if(isLoading) return <TableLoading />
    if(isError) return <TableError404 />  
    if(isSuccess && data) return children;
    if(isSuccess && data?.lenght === 0 ) return <TableNotFound /> ;
}
export default QueryStatusHandler;