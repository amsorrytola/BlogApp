import React from 'react'
import appwriteService from "../appwrite/database.js"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredimage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div >
            <div >
                <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
                 />
            </div>
            <h2
            
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard