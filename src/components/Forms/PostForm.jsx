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
    try {
      let fileId = post?.featuredimage;

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          fileId = file.$id;
          if (post?.featuredimage) {
            appwriteService.deleteFile(post.featuredimage);
          }
        }
      }

      const postPayload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        featuredimage: String(fileId),
        status: data.status,
        userid: userData.$id,
      };

      const dbPost = post
        ? await appwriteService.updatePost(post.$id, postPayload)
        : await appwriteService.createPost(postPayload);

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");

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
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap gap-8"
      >
        {/* Left Section */}
        <div className="flex-1 md:w-2/3 space-y-6">
          <Input
            label="Title"
            placeholder="Enter the title"
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
            {...register("title", { required: "Title is required" })}
          />
          <Input
            label="Slug"
            placeholder="Auto-generated or edit manually"
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 md:w-1/3 space-y-6">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
            {...register("image", { required: !post })}
          />
          {post?.featuredimage && (
            <div className="mt-4">
              <img
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
            {...register("status", { required: "Status is required" })}
          />
          <Button
            type="submit"
            className={`block w-full px-4 py-2 rounded-md shadow-md font-semibold text-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
