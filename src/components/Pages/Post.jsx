import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/database";
import Button from "../Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="">
            
                <div className="">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className=""
                    />

                    {isAuthor && (
                        <div className="">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="">
                    <h1 className="">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            
        </div>
    ) : null;
}
