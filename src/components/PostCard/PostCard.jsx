import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, ThumbsUp, Users, Globe } from 'lucide-react';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../commentFrom/CommentForm';
import moment from 'moment';
import { getDatabase, onValue, ref } from 'firebase/database';
import { CgArrowsExpandLeft } from 'react-icons/cg';

const PostCard = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(47);
  const [showMore, setShowMore]= useState(true)
  const db= getDatabase()
  const [comments, setComments]= useState([])
  const [commentsCount, setCommentsCount]= useState(0)
  const [commentOn, setCommentOn]= useState(false)

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

    useEffect(() => {
      const userRef = ref(db, "comment/");
      onValue(userRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((data) => {
          const comment = data.val();
          const commentId = data.key;
          if (comment.postId==post.id) {
            arr.push({ ...comment, id: commentId });
          }
        });
        setComments(arr);
      });
    }, [db, post]);
    console.log(comments, "comments");
    

  return (
    <div className="w-[555px] border border-border mt-2 mx-auto font-primary bg-white rounded-lg  shadow-sm">
      {/* Post Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className='w-12 h-12  bg-bg flex justify-center items-center text-[26px] font-medium rounded-full'>
              {post?.whoPostImg ? <img src={post?.whoPostImg} className="w-full h-full object-center object-cover" alt="" /> : <span>{post?.whoPostName?.charAt(0).toUpperCase()}</span> }

            </div>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900 text-sm">{post?.whoPostName}</h3>
              </div>
              <p className="text-xs text-gray-500">{post?.whoPostWorkAt || "No Working Status"}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{moment(post?.time).fromNow()}</span>
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
        <p className={`text-sm text-gray-800 ${showMore && "line-clamp-2"}  leading-relaxed`}>
          {post?.content}
        </p>
        {
          post?.content.length > 168 &&           <span className='text-gray text-sm hover:text-primary cursor-pointer' onClick={()=>setShowMore(!showMore)}>{
            showMore ? "...more" : "...less"
            }</span>
        }

      </div>

      {/* Post Image */}
      {
        post?.postImg &&       <div className="px-4 pb-3">
        <img 
          src={post?.postImg}
          alt="Team collaboration"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      }


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
          
          <button onClick={()=>{setCommentsCount(3)
            setCommentOn(true)
          }} className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
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
      {
        commentsCount!==0 &&  <CommentForm post={post}/>
      }
      {
        comments.slice(0, commentsCount).map((comment)=>(
          <>
          <CommentCard comment={comment}/>

          </>
        ))
      }
                {
            commentOn && comments.length>commentsCount && <button className='flex items-center gap-x-2' onClick={()=>setCommentsCount(commentsCount*3)}><CgArrowsExpandLeft className='p-3 rounded-full text-black bg-bg' />
Load More Comments</button>
          }
    </div>
  );
};

export default PostCard;