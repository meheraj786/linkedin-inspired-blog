import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Users,
  Globe,
  Smile,
  SmileIcon,
} from "lucide-react";
import CommentCard from "../CommentCard/CommentCard";
import CommentForm from "../commentFrom/CommentForm";
import moment from "moment";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { ChevronDown, Lightbulb, Laugh } from "lucide-react";
import { PiHandsClappingFill } from "react-icons/pi";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { X, Image, Calendar, Edit3, Trash2 } from "lucide-react";
import Flex from "../../layouts/Flex";

const PostCard = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const db = getDatabase();
  const [likesId, setLikesId] = useState([]);
  const [celebrateId, setCelebrateId] = useState([]);
  const [loveId, setLoveId] = useState([]);
  const [insightfulId, setInsightfulId] = useState([]);
  const [funnyId, setFunnyId] = useState([]);
  const [content, setContent] = useState("");
  const [totalReaction, setTotalReaction] = useState([]);
  const user = useSelector((state) => state.userInfo.value);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentOn, setCommentOn] = useState(false);
  const [sharePop, setSharePop] = useState(false);
  const [editedText, setEditedText] = useState(post.content);
  const [editMode, setEditMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sharedContentEdit, setSharedContentEdit] = useState(
    post.sharedContent || ""
  );

  useEffect(() => {
    Aos.init();
  }, []);

  const handleLike = (reaction) => {
    console.log(reaction, "reaction");
    set(push(ref(db, "react/")), {
      reaction: reaction,
      whoReactName: user?.displayName,
      postId: post.id,
      whoReactId: user?.uid,
      whoReactImg: user?.photoURL || "",
    }).then(() => {
      toast.success("Reacted");
    });
  };
  useEffect(() => {
    const postRef = ref(db, "react/");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const react = item.val();
        const reactId = item.key;
        if (react.postId == post.id) {
          arr.unshift({ ...react, id: reactId });
        }
      });

      setTotalReaction(arr);
      setLikesId(
        arr.filter((r) => r.reaction === "like").map((r) => r.whoReactId)
      );
      setCelebrateId(
        arr.filter((r) => r.reaction === "celebrate").map((r) => r.whoReactId)
      );
      setLoveId(
        arr.filter((r) => r.reaction === "love").map((r) => r.whoReactId)
      );
      setInsightfulId(
        arr.filter((r) => r.reaction === "insightful").map((r) => r.whoReactId)
      );
      setFunnyId(
        arr.filter((r) => r.reaction === "funny").map((r) => r.whoReactId)
      );
    });
  }, []);

  console.log(totalReaction);

  const reactions = [
    {
      icon: <ThumbsUp className="w-5 h-5 text-white" />,
      reaction: "like",
      bg: "bg-blue-500",
    },
    {
      icon: <PiHandsClappingFill className="w-5 h-5  text-white" />,
      reaction: "celebrate",
      bg: "bg-green-500",
    },
    {
      icon: <Heart className="w-5 h-5 text-white" />,
      reaction: "love",
      bg: "bg-red-500",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-white" />,
      reaction: "insightful",
      bg: "bg-yellow-500",
    },
    {
      icon: <Laugh className="w-5 h-5 text-white" />,
      reaction: "funny",
      bg: "bg-cyan-500",
    },
  ];

  useEffect(() => {
    const userRef = ref(db, "comment/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        const comment = data.val();
        const commentId = data.key;
        if (comment.postId == post.id) {
          arr.unshift({ ...comment, id: commentId });
        }
      });
      setComments(arr);
    });
  }, [db, post]);

  const removeReactHandler = () => {
    totalReaction.map((r) => {
      if (r.postId == post.id && r.whoReactId == user?.uid) {
        remove(ref(db, "react/" + r.id));
      }
    });
  };
  const repostHandler = () => {
    set(push(ref(db, "post/")), {
      sharedId: user?.uid,
      sharedPosterImg: user?.photoURL || "",
      whoSharedName: user?.displayName,
      sharedContent: content,
      sharedTime: moment().format(),
      content: post.content,
      whoPostName: post.whoPostName,
      postImg: post.postImg,
      whoPostId: post.whoPostId,
      whoPostImg: post.whoPostImg,
      whoPostWorkAt: post.whoPostWorkAt,
      time: post.time,
      type: "share",
    }).then(() => {
      toast.success("Reacted");
      setSharePop(false);
    });
  };
  const deleteHandler = () => {
    remove(ref(db, "post/" + post.id));
    toast.success("Deleted");
  };
  const updateHandler = () => {
    if (post.type == "share") {
      update(ref(db, "post/" + post.id), {
        sharedContent: sharedContentEdit,
      });
    } else {
      update(ref(db, "post/" + post.id), {
        content: editedText,
      });
    }
    toast.success("Updated");
    setEditMode(false);
  };

  return (
    <div className="w-[555px] border border-border mt-2 mx-auto font-primary bg-white rounded-lg  shadow-sm">
      {post.type == "share" && (
        <>
          <Flex className="p-4 pb-2">
            <Flex className="justify-start py-1 gap-x-2">
              <div className="w-8 h-8  bg-bg flex justify-center items-center text-[16px] font-medium rounded-full">
                {post?.sharedPosterImg ? (
                  <img
                    src={post?.sharedPosterImg}
                    className="w-full h-full object-center object-cover"
                    alt=""
                  />
                ) : (
                  <span>{post?.whoSharedName?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">
                {post?.whoSharedName}
              </h3>
              <p className="text-[10px] text-gray ml-1">reposted this</p>
            </Flex>
            {post.type == "share" && post.sharedId == user?.uid && (
              <>
                {editMode ? (
                  <button
                    onClick={() => updateHandler()}
                    className="p-2 relative hover:bg-gray rounded-full"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 relative hover:bg-gray-100 rounded-full"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    {showDropdown && (
                      <>
                        {/* Overlay to close dropdown */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowDropdown(false)}
                        />

                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40">
                          <button
                            onClick={() => {
                              setEditMode(true);
                              setShowMore(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit post
                          </button>
                          <button
                            onClick={deleteHandler}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete post
                          </button>
                        </div>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </Flex>

          {post.type == "share" && editMode ? (
            <textarea
              value={sharedContentEdit}
              onChange={(e) => setSharedContentEdit(e.target.value)}
              type="text"
              className="w-full px-4 py-2 max-h-[80px] text-sm text-gray-800"
            />
          ) : (
            <p className={`text-sm px-4 py-2 text-gray-800  leading-relaxed`}>
              {post?.sharedContent}
            </p>
          )}

          <hr className="w-[97%] border-gray mx-auto" />
        </>
      )}
      {sharePop && (
        <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-[888] bg-white/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {user?.displayName?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {user?.displayName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Globe className="w-3 h-3" />
                    <span>Post to Anyone</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSharePop(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Text Input */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing or use @ to mention people, companies or schools"
                  className="w-full min-h-[120px] text-lg resize-none border-none outline-none placeholder-gray-400"
                />
                <div className="absolute top-2 right-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Smile className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Shared Post */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Original Post Header */}
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {post?.whoPostImg ? (
                        <img
                          src={post.whoPostImg}
                          alt={post.whoPostName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold">
                          {post?.whoPostName?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {post?.whoPostName}
                        </span>
                      </div>
                      {post?.whoPostWorkAt && (
                        <p className="text-sm text-gray-600 leading-tight">
                          {post.whoPostWorkAt}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <span>{moment(post?.time).fromNow()}</span>
                        <span>•</span>
                        <Globe className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                    {post?.content}
                  </p>
                </div>

                {/* Post Image or Quote */}
                {post?.postImg && (
                  <div className="relative">
                    <img
                      src={post.postImg}
                      alt="Post content"
                      className="w-full object-cover max-h-96"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </button>
                <button
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium disabled:opacity-50"
                  onClick={repostHandler}
                  disabled={!content.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Post Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12  bg-bg flex justify-center items-center text-[26px] font-medium rounded-full">
              {post?.whoPostImg ? (
                <img
                  src={post?.whoPostImg}
                  className="w-full h-full object-center object-cover"
                  alt=""
                />
              ) : (
                <span>{post?.whoPostName?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {post?.whoPostName}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {post?.whoPostWorkAt || "No Working Status"}
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{moment(post?.time).fromNow()}</span>
                <span>•</span>
                <Globe className="w-3 h-3" />
              </div>
            </div>
          </div>
          {post.type != "share" && post.whoPostId == user?.uid && (
            <>
              {editMode ? (
                <button
                  onClick={() => updateHandler()}
                  className="p-2 relative hover:bg-gray rounded-full"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 relative hover:bg-gray-100 rounded-full"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  {showDropdown && (
                    <>
                      {/* Overlay to close dropdown */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowDropdown(false)}
                      />

                      {/* Dropdown Content */}
                      <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40">
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setShowMore(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit post
                        </button>
                        <button
                          onClick={deleteHandler}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete post
                        </button>
                      </div>
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        {post.type != "share" && editMode ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            type="text"
            className="w-full h-[200px] text-sm text-gray-800"
          />
        ) : (
          <p
            className={`text-sm text-gray-800 ${
              showMore && "line-clamp-2"
            }  leading-relaxed`}
          >
            {post?.content}
          </p>
        )}

        {post?.content.length > 168 && (
          <span
            className="text-gray text-sm hover:text-primary cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "...more" : "...less"}
          </span>
        )}
      </div>

      {/* Post Image */}
      {post?.postImg && (
        <div className="px-4 pb-3">
          <img
            src={post?.postImg}
            alt="Team collaboration"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Reaction Summary */}
      <div className="px-4 relative py-2 border-b border-gray-100">
        {isOpen && (
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            data-aos="fade-up"
            className="flex bg-bg shadow-lg p-3 -top-5 left-3 rounded-full absolute items-center gap-3"
          >
            {reactions.map((reaction, i) => (
              <button
                key={i}
                onClick={() => handleLike(reaction.reaction)}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${reaction.bg} hover:scale-180 transition-transform shadow-md`}
              >
                {reaction.icon}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              {likesId.length > 0 && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                  <ThumbsUp className="w-3 h-3 text-white fill-current" />
                </div>
              )}
              {loveId.length > 0 && (
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              )}
              {celebrateId.length > 0 && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border border-white">
                  <PiHandsClappingFill className="w-3 h-3 text-white fill-current" />
                </div>
              )}
              {insightfulId.length > 0 && (
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center border border-white">
                  <Lightbulb className="w-3 h-3 text-white fill-current" />
                </div>
              )}
              {funnyId.length > 0 && (
                <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center border border-white">
                  <SmileIcon className="w-3 h-3 text-white " />
                </div>
              )}
            </div>

            <span>{totalReaction.length} reactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{comments.length} comments</span>
            <span> reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-2">
        <div className="flex items-center justify-around">
          {likesId.includes(user?.uid) ? (
            <button
              onClick={removeReactHandler}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <AiFillLike className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Liked</span>
            </button>
          ) : celebrateId.includes(user?.uid) ? (
            <button
              onClick={removeReactHandler}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PiHandsClappingFill className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Celebrated</span>
            </button>
          ) : loveId.includes(user?.uid) ? (
            <button
              onClick={removeReactHandler}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaHeart className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Loved</span>
            </button>
          ) : insightfulId.includes(user?.uid) ? (
            <button
              onClick={removeReactHandler}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Insightful</span>
            </button>
          ) : funnyId.includes(user?.uid) ? (
            <button
              onClick={removeReactHandler}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Smile className="w-5 h-5 text-cyan-500" />
              <span className="text-sm font-medium">Funny</span>
            </button>
          ) : (
            <button
              onClick={() => {
                handleLike("like");
                setIsOpen(false);
              }}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm font-medium">Like</span>
            </button>
          )}

          <button
            onClick={() => {
              setCommentsCount(3);
              setCommentOn(true);
            }}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button
            onClick={() => setSharePop(true)}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
            <Send className="w-5 h-5" />
            <span className="text-sm font-medium">Send</span>
          </button>
        </div>
      </div>
      {commentsCount !== 0 && <CommentForm post={post} />}
      {comments.slice(0, commentsCount).map((comment) => (
        <>
          <CommentCard comment={comment} />
        </>
      ))}
      {commentOn && comments.length > commentsCount && (
        <button
          className="flex items-center px-4 py-3 text-xs text-gray-700 gap-x-2 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setCommentsCount(commentsCount * 3)}
        >
          <CgArrowsExpandLeft className="w-5 h-5 text-black p-1 bg-bg rounded-full" />
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default PostCard;
