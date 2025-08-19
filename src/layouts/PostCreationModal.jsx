import React, { useState } from 'react';
import { X, ChevronDown, Smile, Image, Calendar, Award, Plus, Clock } from 'lucide-react';

const PostCreationModal = ({onClose, user, description, postHandler, setDescription}) => {


  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-start justify-center pt-[32px] z-50">
      <div className="bg-white w-[744px] h-[592px] mx-4 overflow-hidden rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center pl-[24px] pt-5 space-x-3">
            <div className="relative w-12 h-12 rounded-full text-[26px] flex justify-cemter items-center">
              {/* <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Mehraj H."
                className=" object-cover"
              /> */}
              {user?.photoURL ? <img src={user?.PhotoURL} className="w-full h-full object-center object-cover" alt="" /> : <span>{user?.displayName?.charAt(0).toUpperCase()}</span> }
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{user?.displayName}</h3>
              </div>
              <p className="text-sm text-gray-600">Post to Anyone</p>
            </div>
          </div>
          <button 
            onClick={() => onClose(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Post Content Area */}
        <div className="p-4  flex-1 min-h-96 overflow-y-auto">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full resize-none border-none outline-none text-[18px] text-gray-800 placeholder-gray-500 text-lg min-h-78"
          />
          
          {/* Emoji Button */}
          <div className="flex  justify-start mt-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Smile className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Left side - Media options */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Right side - Schedule and Post buttons */}
            <div className="flex items-center space-x-3">
              <button 
              onClick={postHandler}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  description.trim() 
                    ? 'bg-primary text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!description.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreationModal;