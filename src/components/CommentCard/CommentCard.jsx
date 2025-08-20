import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Flex from '../../layouts/Flex';
import moment from 'moment';

const CommentCard = ({comment}) => {

  
return (
  <div className="bg-white rounded-b-[8px] px-4 py-3 max-w-2xl">
    {/* Comment Header */}
    <div className="flex items-start space-x-3">
      {/* Profile Picture */}
      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-bg text-xs font-semibold text-gray-600 mt-0.5">
        {comment?.whoCommentImg ? (
          <img
            src={comment?.whoCommentImg}
            alt={comment?.whoCommentName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{comment?.whoCommentName?.charAt(0).toUpperCase()}</span>
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        {/* Comment Bubble */}
        <div className=" rounded-lg">
          {/* Commenter Info */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {comment?.whoCommentName}
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                {comment?.whoCommentWorkAt || "No work info added"}
              </p>
            </div>

            <Flex>
              {/* Time */}
              <span className="text-xs mr-2 text-gray-500">
                {moment(comment?.time).fromNow()}
              </span>

              {/* More Options */}
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </Flex>
          </div>

          {/* Comment Text */}
          <p className="text-sm text-gray-800 leading-relaxed">
            {comment?.content}
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default CommentCard;