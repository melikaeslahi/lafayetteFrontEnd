 

export const   convertEnglishToPersian =(number)=>{
    
//  return new Number(number).toLocaleString('fa-ir' );
const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        ?.toString()
        .replace(/\d/g, x => farsiDigits[x]);
}

export const    priceFormatter =(number)=>{
    const formatter = new Intl.NumberFormat('fa-ir', {
        
        currency:'IRR'
    } )

    return formatter.format(number)
   }