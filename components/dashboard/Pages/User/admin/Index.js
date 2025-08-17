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
    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllAdminQuery({ page, perPage, search });
    const admins = query?.data; 

    const [changeStatus, { data: dataStatus }] = useChangeAdminStatusMutation();
    const [changeActivation, { data: dataActivation }] = useChangeActivationMutation();

    const [deleteAdmin, result] = useDeleteAdminMutation();

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
        {key:'status' ,label:'وضعیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeStatus}/> } , 
        {key:'activation' ,label:'وضعیت فعالیت', render:(_ , row)=><StatusRecord status={row.status} id={row.id} changeStatus={changeActivation}/> } ,  
        {key:'setting' , label:'تنظیمات', render:(_,row)=>
        <>
         <Link href={`${pathname}/roles/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    نقش   </Link>
         <Link href={`${pathname}/permissions/${row.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">    دسترسی    </Link>
        <SettingRecord id={row.id} title={row.name} />
        </>}
      ]

    
     
    useEffect(() => {
        useToast({result:result , message:'ادمین'})
    }, [result]);

    useEffect(() => {
         useToast({dataStatus:dataStatus , message:'ادمین'})
    }, [dataStatus])

    useEffect(() => {
         useToast({dataStatus:dataActivation , message:'ادمین'})
    }, [dataActivation])

    return ( 
      <CustomTable 
        title={' کاربران ادمین'}
        sitemap={'بخش  کاربران / کاربران ادمین '}
        pagination={admins?.meta}
        deleteRecord={deleteAdmin}
        data={query}
        columns={columns} />
                
    )
}
export default Index;