import {XMarkIcon, TableCellsIcon, UserIcon, UsersIcon}  from '@heroicons/react/24/outline'
import { MenuProps } from '../types/layout';

export const menus: MenuProps[] = [
    {
        path: '/transactions',
        name: "Transactions",
        icon: <TableCellsIcon className='w-6 h-6'/>
    },
    {
        path: '/admin/officers',
        name: "Officers",
        icon: <UserIcon className='w-6 h-6'/>
    },
    {
        path: '/admin/customers',
        name: "Customers",
        icon: <UsersIcon className='w-6 h-6'/>
    }
]