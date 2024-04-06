"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { UploadDropzone } from "@/app/utils/uploadthing";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Multiselect from "@/components/createpostPage/MultiSelect";
import Delete from "@/components/createpostPage/Delete";
import EditTiptap from "./EditTiptap";
import { Skeleton } from "@/components/ui/skeleton";
import ValidateBlog from "./ValidateBlog";

interface data {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  blogDetail: [
    {
      tag: {
        tagName: string;
      };
    }
  ];
}
interface Tag {
  id: string;
  tagName: string;
}

function EditBlog({
  email,
  id,
}: {
  email: string | null | undefined;
  id: string;
}) {
  const [data, setData] = useState<data>();

  const [tags, setTags] = useState<Tag[]>([]);
  const [cont, setCont] = useState<string>("");
  const [validate, setValidate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [hide, setHide] = useState<boolean>(false);
  const [description, setdescription] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("/api/user/tags");
      const data = await response.json();
      setTags(data.tags);
    };
    fetchTags();
    return () => {
      fetchTags();
    };
  }, []);

  const handleSave = useCallback(async () => {
    // TODO: Add validation
    const savedContent = cont;
    // TODO: Add validation
    if (
      !imgurl ||
      !savedContent ||
      savedContent.length <= 300 ||
      !tags ||
      tags.length === 0 ||
      (!tags.length &&
        !savedContent &&
        !imgurl &&
        savedContent?.length <= 300) ||
      !email
    ) {
      let errorMessage = "";

      if (!imgurl) errorMessage = "Please add an image";
      else if (!savedContent || savedContent.length <= 300)
        errorMessage = "Please add content";
      else if (!tags || tags.length === 0) errorMessage = "Please add tags";
      else if (!email) errorMessage = "Please login";
      else if (
        !tags.length &&
        !savedContent &&
        !imgurl &&
        savedContent?.length <= 300
      )
        errorMessage = "Please add content and tags";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      return null;
    }

    // create slug
    const slug =
      title
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace one or more spaces with a single hyphen
        .replace(/[^\w-]+/g, "") +
      "-" +
      new Date().getTime();
    // create post
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data?.id,
        email: email,
        title: title,
        description: description,
        content: `${savedContent}`,
        tags: selectedTags,
        cover: imgurl,
        slug: slug,
      }),
    });
    if (response.ok) {
      toast({
        title: "Success",
        description: "Post edited successfully",
        variant: "success",
      });
      setTimeout(() => {
        router.push(`/blog/${slug}`);
      }, 4000);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }, [title, description, selectedTags, imgurl]);
  useEffect(() => {
    setLoading(true);
    const fetchcontent = async () => {
      try {
        const response = await fetch(`/api/user/profile/${id}`, {
          method: "GET",
        });
        const blogs = await response.json();
        setData(blogs.data);
        const formatetag: Tag[] = blogs?.data?.blogDetail.map((item: any) => {
          return { tagName: item.tag.tagName, id: item.tag.id };
        });
        setSelectedTags(formatetag);
        setImgurl(blogs?.data?.image);
        setTitle(blogs?.data?.title);
        setdescription(blogs?.data?.description);

        setTimeout(() => {
          setCont(blogs?.data?.content);
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcontent();
    return () => {
      fetchcontent();
    };
  }, []);

  return (
    <div className="px-2 py-6 mt-7 relative">
      {!loading ? (
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Input
            className=" text-4xl !outline-none input---title border-none focus:!outline-none max-md:text-3xl max-sm:text-2xl mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
            placeholder="Enter your title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <ValidateBlog
            title={title}
            validate={validate}
            setValidate={setValidate}
            description={description}
            cont={cont}
            imgurl={imgurl || ""}
            selectedTags={selectedTags}
          />
        </motion.div>
      ) : (
        <Skeleton className="w-full h-[40px] rounded-xl" />
      )}

      <h1 className="text-4xl  max-md:text-3xl max-sm:text-2xl mb-5 transition-all p-2 text-placeholder-default italic">
        Upload Cover Image...
      </h1>
      {!hide && (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImgurl(res[0].url);
            setLoading(false);
            setHide(true);
          }}
        />
      )}
      <div className="relative max-w-5xl mx-auto mb-6 max-h-[600px]">
        {imgurl && (
          <motion.img
            src={imgurl}
            alt="img"
            className="w-full object-cover rounded-lg "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {imgurl && (
          <Delete imgurl={imgurl} setImgurl={setImgurl} setHide={setHide} />
        )}
      </div>
      {!loading ? (
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Input
            className=" text-2xl !outline-none input---title border-none focus:!outline-none max-md:text-xl max-sm:text-base mb-5 transition-all
                              duration-300 placeholder:text-placeholder-default placeholder:italic"
            placeholder="Enter your description..."
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            value={description}
          />
          <ValidateBlog
            title={title}
            validate={validate}
            setValidate={setValidate}
            description={description}
            cont={cont}
            imgurl={imgurl || ""}
            selectedTags={selectedTags}
          />
        </motion.div>
      ) : (
        <Skeleton className="w-full h-[40px] rounded-xl mt-5 mb-5" />
      )}

      {!loading ? (
        <EditTiptap cont={cont} setCont={setCont} />
      ) : (
        <Skeleton className="h-96 w-full rounded-lg my-5" />
      )}
      <ValidateBlog
        title={title}
        validate={validate}
        setValidate={setValidate}
        description={description}
        cont={cont}
        imgurl={imgurl || ""}
        selectedTags={selectedTags}
      />
      <div className="mt-10">
        <Multiselect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
        />
      </div>
      <Button
        type="submit"
        className="mt-14"
        variant={"outline"}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
}

export default EditBlog;
