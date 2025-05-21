import React from 'react'
import { CircleLoader} from "react-spinners"

function Spinner({message}) {

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <CircleLoader color='#00BFFF' size={50} className='m-5'/>
    <p className='text-lg px-2 text-center'>{message}</p>
    </div>

  )
}

export default Spinner
