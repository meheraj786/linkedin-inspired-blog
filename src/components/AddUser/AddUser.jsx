import React, { useEffect, useState } from "react";
import Flex from "../../layouts/Flex";
import { BsInfoSquareFill } from "react-icons/bs";
import { Plus, Check } from "lucide-react";
import { getDatabase, onValue, ref } from "firebase/database";

const AddUser = () => {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        const user = data.val();
        const usersId = data.key;
        arr.push({ ...user, id: usersId });
      });
      setUsers(arr);
    });
  }, []);

  return (
    <div className="w-[300px] border border-border p-3 rounded-[8px] bg-white">
      <Flex className="items-center">
        <h2 className="font-semibold mb-4">Add to your feed</h2>
        <BsInfoSquareFill size={12} />
      </Flex>
      {users.map((user) => (
        <div className="bg-white my-[12px] rounded-lg max-w-sm">
          <div className="flex items-center justify-between">
            {/* Company Info */}
            <div className="flex items-start space-x-3">
              {/* Company Logo */}
              <div className="w-12 h-12 bg-bg font-medium rounded-full flex items-center justify-center">
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

              {/* Company Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                  {user?.username}
                </h3>
                <p className="text-xs text-gray">
                  {user?.workingAt || "No working Status"}
                </p>
                <button
                  // onClick={handleFollow}
                  className={`flex mt-1 items-center space-x-1 px-4 py-1.5 border rounded-full text-sm font-semibold transition-all duration-200 
              'bg-white cursor-pointer hover:bg-gray-50 hover:border-gray-400'
          }`}
                >
                  <>
                    <Plus className="w-4  h-4" />
                    <span>Follow</span>
                  </>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddUser;
