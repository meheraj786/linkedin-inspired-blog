import React, { useState } from "react";
import { Edit3, MoreHorizontal, Trash2 } from "lucide-react";
import Flex from "../../layouts/Flex";
import moment from "moment";
import { useSelector } from "react-redux";
import { getDatabase, ref, remove, update } from "firebase/database";
import toast from "react-hot-toast";

const CommentCard = ({ comment }) => {
  const user = useSelector((state) => state.userInfo.value);
  const db = getDatabase();
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(comment.content || "");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const updateHandler = () => {
    update(ref(db, "comment/" + comment.id), {
      content: editedText,
    }).then(() => {
      toast.success("Updated");
      setEditMode(false);
    });
  };
  const commentRemoveHandler = () => {
    remove(ref(db, "comment/" + comment.id));
    toast.success("Deleted");
  };

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
                {comment.whoCommentId == user?.uid && (
                  <>
                    {editMode ? (
                      <button
                        onClick={() => updateHandler()}
                        className="p-2 relative hover:bg-bg rounded-full"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setDropDownOpen(!dropDownOpen)}
                        className="p-2 relative hover:bg-gray-100 rounded-full"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        {dropDownOpen && (
                          <>
                            {/* Overlay to close dropdown */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setDropDownOpen(false)}
                            />

                            {/* Dropdown Content */}
                            <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40">
                              <button
                                onClick={() => {
                                  setEditMode(true);
                                  // setShowMore(true);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit Comment
                              </button>
                              <button
                                onClick={commentRemoveHandler}
                                className="w-full flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-gray-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Comment
                              </button>
                            </div>
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </Flex>
            </div>

            {/* Comment Text */}
            {editMode ? (
              <input
                onChange={(e) => setEditedText(e.target.value)}
                value={editedText}
                type="text"
                className="text-sm text-gray-800 leading-relaxed border w-full"
              />
            ) : (
              <p className="text-sm text-gray-800 leading-relaxed">
                {comment?.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
