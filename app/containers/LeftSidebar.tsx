"use client"
import Link from 'next/link';
import SidebarSubmenu from './SidebarSubmenu';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { MenuProps } from '../types/layout';
import { menus } from '../constants/menus';
import clsx from 'clsx';


export const MenuItem = ({menu, isActive}: {menu: MenuProps, isActive: boolean}) => {    
    return (<Link href={menu.path}>
            <div  className={`p-4 flex gap-1 items-center hover:bg-base-200 focus:bg-base-200 ${isActive ? 'font-semibold bg-base-200' : 'font-normal'}`}>
                {menu.icon} {menu.name}
            </div>
    </Link>)
}

function LeftSidebar(){
    const {role} = useCookies()?.[0]?.user || {}

    const pathName = usePathname()

    return(
        <div className="drawer-side z-10 hidden lg:block">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="pt-2 w-80 bg-base-100 min-h-full text-base-content">
                {
                    menus.map((route, k) => {
                        const isActive = pathName === route.path || pathName.slice(3) === route.path ;
                        return(
                            <li className={clsx(isActive && "rounded-tr-md rounded-br-md border-primary border-l-4 bg-base-200")} key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : <MenuItem menu={route} isActive={isActive}/>
                                    
                                }
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar