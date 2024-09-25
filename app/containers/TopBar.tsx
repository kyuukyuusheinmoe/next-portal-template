import React from 'react'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import ProfileMenu from './ProfileMenu'

function TopBar(){
    return(
        <>
            <div className="navbar max-h-[5rem] sticky top-0 bg-base-100 z-30 shadow-md ">
                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">{"Logo"}</h1>
                </div>

                <div className="flex-none ">
                    {/* Notification icon */}
                    <button className="btn btn-ghost ml-4  btn-circle">
                        <div className="indicator">
                            <BellIcon className="h-6 w-6"/>
                            {/* {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null } */}
                        </div>
                    </button>
                    {/* Profile icon, opening menu on click */}
                    <ProfileMenu name={"User"}/>
                </div>
            </div>
        </>
    )
}

export default TopBar