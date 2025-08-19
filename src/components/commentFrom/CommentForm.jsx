import React, { useState } from 'react'
import { Image, Smile, Upload } from 'lucide-react';

const CommentForm = () => {
    const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };
  return (
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-center gap-[10px]">
          {/* Profile Picture */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">A</span>
          </div>

          {/* Input Container */}
          <div className="flex-1">
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  className="flex-1 bg-transparent p-[10px] text-[14px] text-gray-700 placeholder-gray-500 outline-none rounded-full"
                />
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 pr-3">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                    title="Upload image"
                  >
                    <Image size={20} />
                  </button>
                  
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                    title="Add emoji"
                  >
                    <Smile size={20} />
                  </button>
                  
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                    title="Attach file"
                  >
                    <Upload size={20} />
                  </button>
                </div>
              </div>

            </div>
          </div>
              {/* Submit button (appears when typing) */}
              {comment.trim() && (
                <button
                  onClick={handleSubmit}
                  className="  bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                >
                  Post
                </button>
              )}
        </div>
      </div>
  )
}

export default CommentForm