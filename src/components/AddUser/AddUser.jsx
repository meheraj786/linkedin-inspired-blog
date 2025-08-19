import React from "react";
import Flex from "../../layouts/Flex";
import { BsInfoSquareFill } from "react-icons/bs";
import { Plus, Check } from "lucide-react";

const AddUser = () => {
  return (
    <div className="w-[300px] mx-auto p-3 rounded-[8px] bg-white">
      <Flex className="items-center">
        <h2 className="font-semibold mb-4">Add to your feed</h2>
        <BsInfoSquareFill size={12} />
      </Flex>
      <div className="bg-white rounded-lg p-4 max-w-sm">
        <div className="flex items-center justify-between">
          {/* Company Info */}
          <div className="flex items-start space-x-3">
            {/* Company Logo */}
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>

            {/* Company Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                The Business Standard
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Company • Newspaper Publishing
              </p>
              <button
                // onClick={handleFollow}
                className={`flex mt-1 items-center space-x-1 px-4 py-1.5 border rounded-full text-sm font-semibold transition-all duration-200 
               'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
              >
                <>
                  <Plus className="w-4 h-4" />
                  <span>Follow</span>
                </>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
