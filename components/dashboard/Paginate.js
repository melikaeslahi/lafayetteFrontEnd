import { setPage } from '@/store/reducers/dashboard/UtilSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Paginate = ({ data, onChange }) => {
    const { current_page, last_page, total } = data

    const [currentPage, setCurrentPage] = useState(current_page)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(6)
    const dispatch = useDispatch();
    const pageClicked = pageNum => {
        setCurrentPage(pageNum)
    }

    const backNextClick = action => {
        if (action === 'increment' && currentPage !== total) {
            setCurrentPage(currentPage + 1)
        }
        if (action === 'decrement' && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
     
    useEffect(() => {
        // onChange(currentPage)
       dispatch(setPage(currentPage));
        
       
        if (currentPage < 4) {
            setStartIndex(startIndex => (startIndex = 0))
            setEndIndex(endIndex => (endIndex = 6))
        } else if (currentPage > 4 && currentPage < last_page - 3) {
            setStartIndex(currentPage - 2)
            setEndIndex(currentPage + 3)
        } else if (currentPage >= last_page - 3) {
            setStartIndex(last_page - 4)
            setEndIndex(last_page + 1)
        }
    }, [currentPage, startIndex, endIndex])
    const pageNumbers = data.links.slice(startIndex, endIndex)

    return (
        <>
            {currentPage > last_page ? null : (
                <div className="flex justify-center items-center">
                    {currentPage > 1 ? (
                        <button
                            className="hover:cursor-pointer border border-pallete rounded-lg text-pallete p-2 m-2"
                            onClick={() => backNextClick('decrement')}>
                            {' '}
                            قبلی{' '}
                        </button>
                    ) : null}

                    {currentPage > 4 ? (
                        <>
                            <button
                                className={`hover:cursor-pointer border border-pallete rounded-lg text-pallete p-2 m-2 `}
                                onClick={() =>
                                    pageClicked(parseInt(data.links[1].label))
                                }
                                type="">
                                {data.links[1].label}
                            </button>
                            <p>...</p>
                        </>
                    ) : null}

                    {pageNumbers.map((link, index) =>
                        index === data.links.length - 1 ||
                        (index === 0 && link.label === '&laquo; Previous') ||
                        link.label === 'Next &raquo;' ? null : (
                            <button
                                className={`hover:cursor-pointer ${
                                    currentPage == link.label
                                        ? 'bg-pallete rounded-lg  text-clifford p-2 m-2'
                                        : 'border border-pallete rounded-lg text-pallete p-2 m-2 '
                                }`}
                                key={index}
                                type=""
                                onClick={() =>
                                    pageClicked(parseInt(link.label))
                                }>
                                {link.label}
                            </button>
                        ),
                    )}
                    {currentPage >= last_page - 3 ? null : (
                        <>
                            <p>...</p>
                            <button
                                className={`hover:cursor-pointer border border-pallete rounded-lg text-pallete p-2 m-2 `}
                                onClick={() =>
                                    pageClicked(
                                        parseInt(data.links[last_page].label),
                                    )
                                }
                                type="">
                                {last_page}
                            </button>
                        </>
                    )}

                    {currentPage !== last_page ? (
                        <button
                            className="hover:cursor-pointer border border-pallete rounded-lg text-pallete p-2 m-2"
                            onClick={() => backNextClick('increment')}>
                            {' '}
                            بعدی{' '}
                        </button>
                    ) : null}
                </div>
            )}
        </>
    )
}
export default Paginate
