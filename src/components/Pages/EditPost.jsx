import React, {useEffect, useState} from 'react'
import  PostForm from '../Forms/PostForm'
import appwriteService from "../../appwrite/database";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className=''>
        
            <PostForm post={post} />
    
    </div>
  ) : null
}

export default EditPost