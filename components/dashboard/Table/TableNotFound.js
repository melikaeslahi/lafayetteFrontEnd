import Image from 'next/image';
import pageNotFound from '../../../public/image/error-page-not-found-vector-27898543.jpg';
const TableNotFound = () => {
    return (
        (<div className="flex flex-col justify-center items-center">
            <Image className="flex   justify-center items-center" src={pageNotFound} width={300} height={300} alt={'notfound'} />
        </div>)
    )
}
export default TableNotFound;