import React from 'react'

const OverlayLoading = () => {
  return (
    <div className='fixed flex left-0 z-50 top-0 justify-center items-center w-full min-h-screen bg-black bg-opacity-20'>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  )
}

export default OverlayLoading
