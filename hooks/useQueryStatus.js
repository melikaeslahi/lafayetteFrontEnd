export const useQueryStatus=(queryResult)=>{
    return{
        isLoading:queryResult.isLoading,
        isError:queryResult.isError,
        isSuccess:queryResult.isSuccess,
        data:queryResult.data
    };
}