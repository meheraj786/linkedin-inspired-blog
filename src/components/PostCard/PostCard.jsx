import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, ThumbsUp, Users, Globe } from 'lucide-react';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../commentFrom/CommentForm';

const PostCard = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(47);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="w-[555px] border border-border mt-2 mx-auto font-primary bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Post Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900 text-sm">Arif Rahman</h3>
              </div>
              <p className="text-xs text-gray-500">Senior Software Engineer at Tech Corp</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>2h</span>
                <span>•</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800 leading-relaxed">
          Excited to share that our team just shipped a major feature update! 🚀
          <br /><br />
          After months of hard work, we've successfully implemented real-time collaboration 
          that will help thousands of users work more efficiently. The journey wasn't easy, 
          but seeing the positive impact makes it all worthwhile.
          <br /><br />
          Key learnings from this project:
          <br />
          ✅ Clear communication is everything
          <br />
          ✅ User feedback drives innovation
          <br />
          ✅ Great teamwork makes the impossible possible
          <br /><br />
          Grateful to work with such an amazing team! 
          <span className="text-blue-600 hover:underline cursor-pointer"> #TechLife #TeamWork #Innovation</span>
        </p>
      </div>

      {/* Post Image */}
      <div className="px-4 pb-3">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop" 
          alt="Team collaboration"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Reaction Summary */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                <ThumbsUp className="w-3 h-3 text-white fill-current" />
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white">
                <Heart className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <span>{likeCount} reactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>12 comments</span>
            <span>5 reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-2">
        <div className="flex items-center justify-around">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors ${
              liked ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">Like</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
            <Send className="w-5 h-5" />
            <span className="text-sm font-medium">Send</span>
          </button>
        </div>
      </div>
      <CommentForm/>
      <CommentCard/>
    </div>
  );
};

export default PostCard;