import React, {useState} from 'react'
import { urlFor, client } from '../client'
import { useNavigate, Link } from 'react-router-dom'
import {v4 as uuidv4} from "uuid";
import {MdDownloadForOffline} from "react-icons/md"
import { AiTwotoneDelete } from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from "react-icons/bs"
import { useAuthContext } from '../context';

function Pin({pin:{image, postedBy, _id, destination, save}}) {
    const [postHovered, setPostHovered] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const alreadySaved = !!(save?.filter((item)=>item.postedBy._id===user._id)?.length);
    //  const alreadySaved = false;
    // console.log("Save: ",save);
    
    // console.log("User: ",user);
    

    const deletePin = (id)=>{
        client.delete(id).then(()=>{
            window.location.reload();
        });
    }

    const savePin = (id)=>{
        if(!alreadySaved){
            client.patch(id)
            .setIfMissing({save:[]})
            .insert("after", "save[-1]", [{
                _key:uuidv4(),
                userId:user._id,
                postedBy:{
                    _type:'postedBy',
                    _ref:user._id

                }
            }])
            .commit()
            .then(()=>{
                window.location.reload();
            })
        }
    }

  return (
    <div className='mt-2'>
        <div onMouseEnter={()=>{
            setPostHovered(true)
        }} onMouseLeave={()=>{
            setPostHovered(false)
        }}
        onClick={()=>{
            navigate(`/pin-detail/${_id}`)
        }}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
      <img src={urlFor(image).width(250).url()} alt="user-post" className='rounded-lg w-full' />
        {postHovered && (
            <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pr-2 pb-2 z-50' style={{height:'100%'}}>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                    <a href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e)=>e.stopPropagation()}
                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                    >
                    <MdDownloadForOffline/>    
                    </a>
                    </div>
                    {alreadySaved ? (
                        <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>{save?.length} Saved</button>
                    ):(
                        <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                        onClick={(e)=>{
                            e.stopPropagation();
                            savePin(_id);
                        }}
                        >Save</button>
                    )}
                </div>
                <div className='flex justify-between gap-2 items-center w-full'>
                    {destination && (
                        <a href={destination} target='_blank' rel='noreferrer'
                        className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                        ><BsFillArrowUpRightCircleFill/>{destination.length>15?`${destination.slice(8, 15)}...`:destination}</a>
                    )}
                    {postedBy?._id === user._id &&(
                        <button type='button'
                        onClick={(e)=>{
                            e.stopPropagation();
                            deletePin(_id);
                        }}
                        className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                <AiTwotoneDelete/>
                        </button>
                    )}
                </div>
            </div>
        )}
        </div>

        <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
        <img src={postedBy?.image}
        className='w-8 h-8 rounded-full object-cover'
        alt="user-profile" />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
        </Link>

    </div>
  )
}

export default Pin
