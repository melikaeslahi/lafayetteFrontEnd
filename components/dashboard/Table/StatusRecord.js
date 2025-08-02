const StatusRecord=({status , id , chengeStatus})=>{
    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }
    return(
        <>
         <input type="checkbox" 
         name="status"
          defaultChecked={status === 1 ? true : false} 
          onChange={() => handlerStatus(id)} />
        </>
    );
}
export default StatusRecord;