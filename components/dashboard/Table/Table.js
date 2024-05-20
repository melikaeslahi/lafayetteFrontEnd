
const Table = ({ children , className }) => {

    return (
        <>
            <table className={`${className} w-full font-lotus overflow-x-scroll   dark:text-gray-100 text-black  p-3 shadow-lg`}>
                {/* <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        {header.map(({ id, name }) => (<th key={id} className="pl-3 py-3">{name}</th>))}
                    </tr>
                </thead> */}
                 {children} 
            </table>
        </>
    )
}
export default Table;