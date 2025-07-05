import Link from "next/link";
import TitlePage from "../TitlePage";

export default function TableHeader({title , sitemap , href}){
     let linkName;
     if(href.includes('/create'))
     linkName = `ایجاد ${title} ` ; 
     if(href.includes('/update'))
     linkName = `ویرایش ${title}` ; 
     
     console.log(href)

    return(
        <TitlePage
        name={`${title} ها`}
        sitemapPage= {sitemap}

    >
        <Link
            href={`${href}`}
            className="py-4 px-8 bg-pallete rounded text-white" >
            {' '}
             {linkName}
        </Link>
    </TitlePage>
    );
}