import {  faCog,   faDollar, faEnvelope, faFirstAid , faShower, faTicket, faUsers } from "@fortawesome/free-solid-svg-icons";
 

const items =[
    {
        id: '1',
        name: 'بخش فروش',
        icon: faDollar,
        openDropDown: false,
        children: [{
            id: '7',
            name: 'ویترین',
            icon: faShower,
            openDropDown: false,
            children: [
                {
                    id: '12',
                    name: 'دسته بندی ها',
                    link: '/dashboard/market/category',
                    

                },
                {
                    id: '13',
                    name: 'کالاها',
                    link: '/dashboard/market/product',
                   

                },
                {
                    id: '14',
                    name: 'فرم کالا ها',
                    link: '/dashboard/market/attribute',
                  

                },
                {
                    id: '15',
                    name: ' برند ها',
                    link: '/dashboard/market/brand',
                    

                },
                {
                    id: '16',
                    name: 'انبار',
                    link: '/dashboard/market/store',
                  

                },
                {
                    id: '17',
                    name: 'نظرات',
                    link: '/dashboard/market/comment',
                   

                },
            ]
        },
        {
            id: '8',
            name: 'سفارشات',
            icon: faFirstAid,
            openDropDown:false,
            children: [
                {
                    id: '23',
                    name: 'تمام سفارشات',
                    link: '/dashboard/market/orders/all',
                    
    
                },
                {
                id: '18',
                name: 'جدید',
                link: '/dashboard/market/orders/newOrders',
                

            },
            {
                id: '19',
                name: 'درحال ارسال',
                link: '/dashboard/market/orders/sending',
               
            },
            {
                id: '20',
                name: 'پرداخت نشده',
                link: '/dashboard/market/orders/unpaind',
                

            },
            {
                id: '21',
                name: 'باطل شده',
                link: '/dashboard/market/orders/canceled',
             
            },
            {
                id: '22',
                name: 'مرجوعی',
                link: '/dashboard/market/orders/returned',
               

            },
          ]
        },

        {
            id: '9',
            name: 'پرداخت ها',
            icon: '',
            openDropDown:false,
            children: [{
                id: '24',
                name: 'تمام پرداخت ها ',
                link: '/dashboard/market/payments/all',
              

            },
            {
                id: '25',
                name: 'پرداخت های آنلاین',
                link: '/dashboard/market/payments/online',
                
            },
            {
                id: '26',
                name: 'پرداخت های آفلاین',
                link: '/dashboard/market/payments/offline',
               

            },
            {
                id: '27',
                name: 'در محل',
                link: '/dashboard/market/payments/cash',
               

            },]
        },
        {
            id: '10',
            name: 'تخفیف ها',
            
            openDropDown:false,
            children: [
                {
                    id: '28',
                    name: 'کپن تخفیف',
                    link: '/dashboard/market/discount/copan',
                  

                },
                {
                    id: '29',
                    name: ' تخفیف عمومی',
                    link: '/dashboard/market/discount/commonDiscount',
                     

                },
                {
                    id: '30',
                    name: 'فروش شگفت انگیز',
                    link: '/dashboard/market/discount/amazingSale',
                    

                },
            ]
        },
        {
            id: '11',
            name: 'روش ها ارسال',
            link: '/dashboard/market/delivery',
           

        },
        ]

    },
    {
        id: '2',
        name: 'بخش محتوایی',
        icon: faDollar,
        openDropDown:false,
        children: [
            {
                id: '31',
                name: 'دسته بندی ها',
                link: '/dashboard/content/category',
               
            },
            {
                id: '32',
                name: 'پست ها',
                link: '/dashboard/content/post',
               
            },

            {
                id: '33',
                name: 'نظرات',
                link: '/dashboard/content/comment',
                

            },
            {
                id: '34',
                name: 'منو',
                link: '/dashboard/content/menu',
             

            },
            {
                id: '35',
                name: 'سوالات متداول',
                link: '/dashboard/content/faq',
              
            },
            {
                id: '36',
                name: 'بنر ها',
                link: '/dashboard/content/banner',
                

            },
            {
                id: '37',
                name: 'پیج ساز',
                link: '/dashboard/content/page',
                 

            },
            {
                id: '52',
                name: 'اسلایدرها',
                link: '/dashboard/content/slider',
                 

            },
        ]

    },
    {
        id: '3',
        name: 'بخش کاربران',
        icon: faUsers,
        openDropDown:false,
        children: [{
            id: '38',
            name: 'مشتریان',
            link: '/dashboard/user/customer',
             

        },
        {
            id: '39',
            name: 'کاربران ادمین',
            link: '/dashboard/user/admin',
            


        },

        {
            id: '40',
            name: 'سطوح دسترسی',
            icon: faUsers,
            openDropDown:false,
            children: [{
                id: '41',
                name: ' مدیریت دسترسی',
                link: '/dashboard/user/permission',
              


            },
            {
                id: '42',
                name: ' مدیریت نقش ها ',
                link: '/dashboard/user/role',
             


            },]

        },]

    },
    {
        id: '4',
        name: 'بخش تیکت ها',
        icon: faTicket,
        openDropDown:false,
        children: [
            {
                id: '49',
                name: 'همه ی تیکت ها',
                link: '/dashboard/ticket/all',
                


            },
            {
                id: '43',
                name: 'دسته بندی تیکت ها',
                link: '/dashboard/ticket/category',
                

            },
            {
                id: '44',
                name: ' اولویت تیکت ها',
                link: '/dashboard/ticket/priority',
                 

            },
            {
                id: '45',
                name: ' تیکت های ادمین',
                link: '/dashboard/ticket/admin',
                

            },
            {
                id: '46',
                name: 'تیکت ها باز',
                link: '/dashboard/ticket/open',
                


            },
            {
                id: '47',
                name: ' تیکت های جدید',
                link: '/dashboard/ticket/newTickets',
             

            },

            {
                id: '48',
                name: 'تیکت های بسته',
                link: '/dashboard/ticket/close',
                 


            },

         
        ]

    },
    {
        id: '5',
        name: 'بخش اطلاع رسانی',
        icon: faEnvelope,
        openDropDown:false,
        children: [
            {
                id: '50',
                name: ' اطلاع رسانی ایمیلی ',
                link: '/dashboard/notify/email',
              


            },
            {
                id: '51',
                name: ' اطلاع رسانی  پیامکی ',
                link: '/dashboard/notify/sms',
                


            },
        ]

    },
    {
        id: '6',
        name: 'تنظیمات',
        link: '/dashboard/setting',
        icon: faCog,

    },


]



export default items 