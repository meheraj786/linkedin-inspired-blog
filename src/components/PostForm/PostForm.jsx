import React, { useState } from "react";
import Flex from "../../layouts/Flex";
import { PiArticleNyTimesFill, PiVideoFill } from "react-icons/pi";
import { HiPhoto } from "react-icons/hi2";
import { getDatabase, push, ref, set } from "firebase/database";
import moment from "moment";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PostForm = () => {
  const [description, setDescription] = useState("");
  const db = getDatabase();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.userInfo.value);


  const postHandler = () => {
    console.log("post");
    set(push(ref(db, "post/")), {
      content: description,
      whoPostName: user?.displayName,
      whoPostId: user?.uid,
      time: moment().format(),
    }).then(() => {
      toast.success("Post Successfull");
    });
  };
  return (
    <div className="w-[555px] font-primary bg-white rounded-[8px] py-3 px-4 pb-1 mx-auto">
      <Flex className="gap-x-2">
        <div className="w-[48px] bg-green-400 h-[48px] rounded-full"></div>
        <div className="flex-1 border border-[#AAAAAA] bg-white rounded-full px-5 py-3">
          <span className="text-[14px] font-semibold">Share a Post</span>
        </div>
      </Flex>
      <Flex className="px-[43px] mt-1">
        <p className="px-[10px] cursor-pointer flex items-center hover:bg-gray/20 rounded-sm py-2 text-[14px]">
          <span className="mr-2">
            <PiVideoFill color="#5F9B41" size={24} />
          </span>
          Video
        </p>
        <p className="px-[10px] cursor-pointer flex items-center hover:bg-gray/20 rounded-sm py-2 text-[14px]">
          <span className="mr-2">
            <HiPhoto color="#378FE9" size={24} />
          </span>
          Image
        </p>
        <p className="px-[10px] cursor-pointer flex items-center hover:bg-gray/20 rounded-sm py-2 text-[14px]">
          <span className="mr-2">
            <PiArticleNyTimesFill color="#E06847" size={24} />
          </span>
          Write Article
        </p>
      </Flex>
    </div>
  );
};

export default PostForm;
