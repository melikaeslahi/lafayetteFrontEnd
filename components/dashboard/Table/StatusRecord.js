const StatusRecord=({status , id , changeStatus})=>{
    const handlerStatus = async (id) => {
        await changeStatus(id);
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