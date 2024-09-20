import React, { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type DialogProps = {
    title: string,
    isOpen: boolean,
    onClose: ()=> void,
    children: ReactNode,
    sizeClass?:string
}
const Dialog = ({title, isOpen, onClose, sizeClass="w-lg max-w-xl", children}: DialogProps) => {
  return (
    <dialog id="my_modal_4" className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={clsx("modal-box overflow-hidden ", sizeClass)}>
          <div className="w-full flex justify-between items-start cursor-pointer" onClick={onClose}> 
            <h3 className="font-bold text-lg">{title}</h3>
            <XMarkIcon className='w-8'/>
          </div>
          <div className='overflow-y-scroll max-h-[75vh] hide-scrollbar '>
            {children}
          </div>
            <div className="modal-action">
              {/** Actions Here */}
            </div>
        </div>
    </dialog>
  )
}

export default Dialog
