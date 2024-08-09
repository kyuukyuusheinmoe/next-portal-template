"use client"
import Link from 'next/link';
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { MenuProps } from '../types/layout';
import { usePathname } from 'next/navigation';

const routes: MenuProps[] = [
    {
        path: '/admin/dashboard',
        name: "Category Management",
        icon: <XMarkIcon/>
    },
    {
        path: '/admin/dashboard',
        name: "Asset Management",
        icon: <XMarkIcon/>
    },
    {
        path: '/admin/dashboard',
        name: "Repayment Management",
        icon: <XMarkIcon/>
    }
]

function LeftSidebar(){

    const pathName = usePathname()

    return(
        <>
        <div className="drawer-side z-50">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full   text-base-content">
            <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden">
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>
                <li className="mb-2 font-semibold text-xl">
                    <Link href={'/'}>Logo</Link> </li>
                {
                    routes.map((route, k) => {
                        const isActive = pathName === route.path;
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<Link
                                        href={route.path}
                                        className={`${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                                <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>
                                    </Link>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
        </>
    )
}

export default LeftSidebar