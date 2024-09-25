"use client"
import React, { ReactNode } from 'react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export type MenuProps = {
    label: ReactNode,
    onClick: () => void
}
export type ProfileMenuProps = {
    name: string;

}
const ProfileMenu = ({name }: ProfileMenuProps) => {

    async function logoutUser(){
        //call logout action
    }  

    const menuList = [
        {label: <> <button className="btn btn-circle" type="button">
                    <ArrowRightStartOnRectangleIcon className='w-8'/>
                    </button>Logout
                </>, 
        onClick: logoutUser
        }]
    
    return (
        <div className="dropdown dropdown-end ml-4 cursor-pointer">
                            <div tabIndex={0} className="avatar online placeholder">
                                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                                    <span className="text-xl">{name ? name.charAt(0).toUpperCase() : "U" }</span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    menuList?.map((menu: MenuProps, index: number)=> <li key={index} onClick={menu.onClick} className='cursor-pointer'>
                                        <div className="flex gap-2 items-center cursor-pointer">
                                            {menu.label}
                                        </div>
                                    </li>)
                                }
                            </ul>
        </div>
    
  )
}

export default ProfileMenu
