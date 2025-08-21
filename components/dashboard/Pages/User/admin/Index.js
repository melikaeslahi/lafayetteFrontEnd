'use client'
import { CustomTable, SettingRecord, StatusRecord } from "@/components/dashboard/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname  } from "next/navigation";
import Link from "next/link";
import { useChangeActivationMutation, useChangeAdminStatusMutation, useDeleteAdminMutation, useGetAllAdminQuery } from "@/lib/user/adminUserApi";
import useToast from "@/hooks/useToast";
 
const Index = () => {
    const pathname = usePathname();

 

    const  columns =[
        {key:'first_name', label:' نام ونام خانوادگی ' ,render:(value , row)=>`${value} ${row.last_name}`},
        {key:'email' ,label:'ایمیل'} ,
        {key:'mobile' ,label:'موبایل'} , 
        {key:'roles' ,label:'نقش ها' ,render:(value)=> value ?  value.map(( role ) => (
            <p key={role.id}>{role.name}</p>
        )) : 'نقشی وجود ندارد'  },
        {key:'permissions' ,label:'دسترسی ها' ,render:(value)=> value ?  value.map(( permission) => (
            <p key={permission.id}>{ permission.name}</p>
        )) : 'نقشی وجود ندارد'  },
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord message={'ادمین'} query={useChangeAdminStatusMutation} status={row.status} id={row.id}  /> } , 
        {key:'activation' ,label:'وضعیت فعالیت', render:(_ , row)=><StatusRecord message={'ادمین'} name={'activation'} query={useChangeActivationMutation} status={row.status} id={row.id}/> } ,  
        {key:'setting' , label:'تنظیمات', render:(_,row)=>
        <>
         <SettingRecord message={'ادمین'} query={useDeleteAdminMutation} id={row.id} title={row.name} />
         <Link href={`${pathname}/roles/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    نقش   </Link>
         <Link href={`${pathname}/permissions/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    دسترسی    </Link>
        </>}
      ]


    return ( 
      <CustomTable 
        title={' کاربران ادمین'}
        sitemap={'بخش  کاربران / کاربران ادمین '}
        query={useGetAllAdminQuery}
        columns={columns} />
                
    )
}
export default Index;