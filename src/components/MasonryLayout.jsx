import React from 'react'
import Masonry from "react-masonry-css"
import Pin from "./Pin"

const breakPointObj = {
  default:4,
  3000:6,
  2000:5,
  1200:3,
  1000:2, 
  500:1,
}

function MasonryLayout({pins}) {
  return (
    <Masonry className='flex animate-slide-fwd gap-3' breakpointCols={breakPointObj}>
      {pins?.map((pin)=>(
        <Pin key={pin._id} pin={pin} className="w-max"/>
      ))}
    </Masonry>
  )
}

export default MasonryLayout
