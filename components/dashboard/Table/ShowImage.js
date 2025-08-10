import Image from "next/image";

const ShowImage = ({image})=>{
    const indexArray = image && Object.entries(image?.indexArray);

    return(
      <>
        {indexArray ? indexArray?.map(([size, value]) => (
           itemCategory.image.currentImage === size &&  <Image key={size}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`}
              unoptimized={true} 
              alt="image" 
              className="w-12 h-12" 
              width={'100'} 
              height={'100'} />
         )) : 
         <Image 
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
           unoptimized={true}
           alt="image"
           className="w-12 h-12"
           width={'100'} 
           height={'100'} />
         }   
      </>
    )
}
export default ShowImage;