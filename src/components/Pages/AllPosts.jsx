import React, {useState, useEffect} from 'react'
import PostCard from '../PostCard';
import appwriteService from "../../appwrite/database";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className=''>
        
            <div className=''>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            
    </div>
  )
}

export default AllPosts