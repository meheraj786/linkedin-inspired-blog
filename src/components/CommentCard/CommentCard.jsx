import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Flex from '../../layouts/Flex';

const CommentCard = () => {
  return (
    <div className="bg-white border-l-2 border-gray-100 pl-4 py-3 max-w-2xl">
      {/* Comment Header */}
      <div className="flex items-start space-x-3">
        {/* Profile Picture */}
        <img 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face" 
          alt="Commenter Profile"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
        />
        
        {/* Comment Content */}
        <div className="flex-1">
          {/* Comment Bubble */}
          <div className="bg-gray-50 rounded-lg p-3">
            {/* Commenter Info */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="font-semibold text-gray-900 text-sm">Md Junayed</h4>
                </div>
                <p className="text-xs text-gray-500">MERN Stack Developer | NextJs Developer | Problem Solver</p>
              </div>
              <Flex>
            <span className="text-xs mr-2 text-gray-500">1w</span>
              <button className="p-1 hover:bg-gray-200 rounded-full">
                
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                
              </button>

              </Flex>
            </div>
            
            {/* Comment Text */}
            <p className="text-sm text-gray-800 leading-relaxed">
              Thanks a lot for your information. I would like to apply that from now on.
            </p>
          </div>
          
        </div>
      </div>


    </div>
  );
};

export default CommentCard;