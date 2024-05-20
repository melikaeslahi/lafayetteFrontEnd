 
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const StarProductRating =()=>{
    const [rating, setRating] =  useState(0)
    const handleRating = (rate) => {
        setRating(rate)
    
        
      }
      console.log(rating);
      const onPointerEnter = () => console.log('Enter')
      const onPointerLeave = () => console.log('Leave')
      const onPointerMove = (value , index ) => console.log(value, index)
    return(
        <>
        <section className='flex'>
        <Rating
         style={{display: 'flex'}}
        SVGstyle={{display:'flex'}}
        transition={true}
          onClick={handleRating}
          size={20}
          initialValue={2}
          emptyStyle={{display:'flex'}}
          // allowFraction={true}
          // disableFillHover={true} 
          SVGstorkeWidth={0}
          fillStyle={{display:'block'}}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
           onPointerMove={onPointerMove}
        /* Available Props */
      />
        </section>
       
        </>
    );

}
export default StarProductRating;