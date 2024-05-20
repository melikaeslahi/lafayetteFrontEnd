
import Image from 'next/image';
import  fore from '../../../public/image/404-bulunamadi-hatasi-ve-cozumu.png';
const TableError404 = () => {
    return (
        (<div className="flex flex-col justify-center items-center">
            <Image className="flex   justify-center items-center" src={fore} width={400} height={400} alt={'errorpage'} />
        </div>)
    )
}
export default TableError404;