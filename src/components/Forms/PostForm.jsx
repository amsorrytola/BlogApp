import React, { useCallback, useEffect } from "react";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import RTE from "../RTE.jsx";
import { useForm } from "react-hook-form";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/database.js";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredimage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;5
        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredimage: String(data.featuredimage),
          status: data.status,
          userid: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-2/3">
          <Input
            label="Title :"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="slug"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTargent.value), {
                shoulValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3">
          <Input
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div>
              <img
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
