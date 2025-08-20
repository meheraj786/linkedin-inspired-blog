import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdTv } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfileInfoSidebar = () => {
  const [user, setUser] = useState(null);
  const db = getDatabase();
  const data = useSelector((state) => state.userInfo.value);
  useEffect(() => {
    const userRef = ref(db, "users/" + data?.uid);
    onValue(userRef, (snapshot) => {
        const user = snapshot.val();
        const usersId = snapshot.key;
        setUser({ ...user, id: usersId });
      });
  }, []);

  return (
    <div className="flex flex-col font-primary">
      <Link to="/profile">
      <div className="bg-white w-[225px] border border-border rounded-[8px]">
        <div className="top">
          <div className="cover relative object-center rounded-t-[8px] bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 h-[58px] w-full">
            {user?.coverImage && (
              <img
                src={user?.coverImage}
                className="w-full h-full object-center object-cover"
                alt=""
              />
            )}

            <div className="bg-bg flex justify-center items-center text-[26px] font-medium left-[16px] -bottom-[44px] absolute w-[72px] h-[72px] rounded-full">
              {user?.profileImage ? (
                <img
                  src={user?.profileImage}
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ) : (
                <span>{user?.username?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>
        <div className="bottom px-[16px] pb-[16px] mt-[48px]">
          <h3 className="text-[20px] font-semibold">{user?.username}</h3>
          <p className="text-[12px] line-clamp-2">
            {user?.bio ? user?.bio : "No Bio Yet"}
          </p>
          <p className="text-[12px] mb-2 mt-1 text-gray">
            {" "}
            {user?.location ? user?.location : "No Location Found"}{" "}
          </p>
          <p className="text-[12px] text-gray">
            {user?.workingAt ? user?.workingAt : "No Working Status Found"}
          </p>
        </div>
      </div>
      </Link>
      <div className="bg-white border border-border p-4 mt-2 w-[225px] rounded-[8px]">
        <p className="text-[12px] mb-3">Profile Views</p>
        <p className="text-[12px]">View All Analytics</p>
      </div>
      <div className="bg-white border border-border p-4 mt-2 w-[225px] rounded-[8px]">
        <p className="text-[12px] flex items-center">
          {" "}
          <PiBookmarkSimpleFill className="mr-2" /> Save Items
        </p>
        <p className="text-[12px] flex items-center my-4">
          {" "}
          <MdGroups className="mr-2" />
          Groups
        </p>
        <p className="text-[12px] flex items-center my-4">
          {" "}
          <FaRegNewspaper className="mr-2" />
          Newsletter
        </p>
        <p className="text-[12px] flex items-center">
          {" "}
          <IoMdTv className="mr-2" />
          Events
        </p>
      </div>
    </div>
  );
};

export default ProfileInfoSidebar;
