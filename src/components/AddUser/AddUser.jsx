import React, { useEffect, useState } from "react";
import Flex from "../../layouts/Flex";
import { BsInfoSquareFill } from "react-icons/bs";
import { Plus, Check } from "lucide-react";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddUser = () => {
  const db = getDatabase();

  const user = useSelector((state) => state.userInfo.value);
  const [users, setUsers] = useState([]);
  const [followId, setFollowId] = useState([]);
  const [follow, setFollow] = useState([]);
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        const users = data.val();
        const usersId = data.key;
        if (usersId!=user?.uid) {
          arr.push({ ...users, id: usersId });
        }
      });
      setUsers(arr);
    });
  }, []);
  useEffect(() => {
    const followRef = ref(db, "follow/");
    onValue(followRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        const follow = data.val();

        if (
          follow.followerId === user?.uid ||
          follow.followingId === user?.uid
        ) {
          arr.push({ ...follow, id: data.key });
        }
      });
      setFollow(arr);
      setFollowId(arr.map((a) => a.followerId + a.followingId));
    });
  }, [db, user?.uid]);

  const followHandler = (followUser) => {
    set(push(ref(db, "follow/")), {
      followerId: user?.uid,
      followingId: followUser.id,
      followerImg: user?.photoURL || "",
      followingImg: followUser.profileImage || "",
    }).then(() => {
      toast.success("Following");
    });
  };
  const unFollowHandler = (followUser) => {
    follow.map((f) => {
      if (f.followerId == user?.uid && f.followingId == followUser.id) {
        remove(ref(db, "follow/" + f.id)).then(() => {
          toast.success("Unfollowing");
        });
      }
    });
  };

  return (
    <div className="w-[300px] border border-border p-3 rounded-[8px] bg-white">
      <Flex className="items-center">
        <h2 className="font-semibold mb-4">Add to your feed</h2>
        <BsInfoSquareFill size={12} />
      </Flex>
      {users.map((u) => (
        <div className="bg-white my-[12px] rounded-lg max-w-sm">
          <div className="flex items-center justify-between">
            {/* Company Info */}
            <div className="flex items-start space-x-3">
              {/* Company Logo */}
              <div className="w-12 h-12 bg-bg font-medium rounded-full flex items-center justify-center">
                {u?.profileImage ? (
                  <img
                    src={u?.profileImage}
                    className="w-full h-full object-center object-cover"
                    alt=""
                  />
                ) : (
                  <span>{u?.username?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              {/* Company Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                  {u?.username}
                </h3>
                <p className="text-xs text-gray">
                  {u?.workingAt || "No working Status"}
                </p>
                {followId.includes(user?.uid + u.id) ? (
                  <button
                    onClick={() => unFollowHandler(u)}
                    className={`flex mt-1 items-center space-x-1 px-4 py-1.5 border rounded-full text-sm font-semibold transition-all duration-200 
              'bg-white cursor-pointer hover:bg-gray-50 hover:border-gray-400'
          }`}
                  >
                    <>
                      <Plus className="w-4  h-4" />
                      <span>Unfollow</span>
                    </>
                  </button>
                ) : followId.includes(u.id + user?.uid) ? (
                  <button
                    onClick={() => followHandler(u)}
                    className={`flex mt-1 items-center space-x-1 px-4 py-1.5 border rounded-full text-sm font-semibold transition-all duration-200 
              'bg-white cursor-pointer hover:bg-gray-50 hover:border-gray-400'
          }`}
                  >
                    <>
                      <Plus className="w-4  h-4" />
                      <span>Follow Back</span>
                    </>
                  </button>
                ) : (
                  <button
                    onClick={() => followHandler(u)}
                    className={`flex mt-1 items-center space-x-1 px-4 py-1.5 border rounded-full text-sm font-semibold transition-all duration-200 
              'bg-white cursor-pointer hover:bg-gray-50 hover:border-gray-400'
          }`}
                  >
                    <>
                      <Plus className="w-4  h-4" />
                      <span>Follow</span>
                    </>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddUser;
