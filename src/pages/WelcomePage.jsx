import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import LogoSmall from "../layouts/LogoSmall";
import LogoLarge from "../layouts/LogoLarge";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";
import { setUser } from "../features/userInfoSlice";

const WelcomePage = () => {
  const auth = getAuth();
  const [description, setDescription] = useState("");
  const db = getDatabase();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch=useDispatch()
  const [verified, setVerified] = useState(false);
  const user = useSelector((state) => state.userInfo.value);
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedText, setEditText] = useState("");
  const [editName, setEditName] = useState(false);
  const [editedNameText, setEditedNameText] = useState(user?.displayName);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerified(true);
    }
  });
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
  useEffect(() => {
    const postRef = ref(db, "post/");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const post = item.val();
        const postId = item.key;
        arr.unshift({ ...post, id: postId });
      });
      setPosts(arr);
    });
  }, []);

  const updateNameHandler = () => {
    updateProfile(auth.currentUser, {
      displayName: editedNameText,
    }).then(() => {
      dispatch(setUser(auth.currentUser))
      update(ref(db, "users/" + user?.uid), {
        username: editedNameText,
      });
      posts.map((post) => {
        if (post.whoPostId == user?.uid) {
          update(ref(db, "post/" + post.id), {
            whoPostName: editedNameText,
          });
          toast.success("Name Updated");
        }
      });
    });
  };

  const postHandler = () => {
    console.log("post");
    set(push(ref(db, "post/")), {
      content: description,
      whoPostName: user?.displayName,
      whoPostId: user?.uid,
      time: moment().format(),
    }).then(() => {
      toast.success("Post Successfull");
    });
  };

  const deleteHandler = (item) => {
    remove(ref(db, "post/" + item.id));
    toast.success("Deleted");
  };
  const updateHandler = (item) => {
    update(ref(db, "post/" + item.id), {
      content: editedText,
    });
    toast.success("Updated");
  };

  if (!verified) return <div>Please Verify Your Email</div>;

  return (
    <div>
      <Toaster position="top-right" />
      <p>{user?.uid}</p>
      {editName ? (
        <input
          type="text"
          value={editedNameText}
          onChange={(e) => setEditedNameText(e.target.value)}
        />
      ) : (
        <p>{user?.displayName}</p>
      )}
      {editName ? (
        <button
          onClick={() => {
            updateNameHandler();
            setEditName(false);
          }}
        >
          Save
        </button>
      ) : (
        <button onClick={() => setEditName(true)}>Edit Name</button>
      )}

      <p>{user?.email}</p>
      <p>{user?.emailVerified}</p>
      {verified ? "User is Verified" : "User is not verified"}
      {/* {
        users.map((item)=>(
          <>
          <p>{item?.username}</p>
          <p>{item?.email}</p>
          </>
        ))
      } */}
      <div>
        <textarea
          name=""
          onKeyDown={(e) => e.key == "Enter" && postHandler()}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border"
          placeholder="Write Whats your mind"
          id=""
        ></textarea>
        <button onClick={postHandler}>Post</button>
      </div>
      <hr />
      {posts.map((item) => (
        <>
          <p>{item?.whoPostName}</p>
          <p>{moment(item?.time).fromNow()}</p>
          {editMode && selectedPost.id == item.id ? (
            <textarea
              name=""
              onKeyDown={(e) => e.key == "Enter" && updateHandler()}
              value={editedText}
              onChange={(e) => setEditText(e.target.value)}
              className="border"
              placeholder="Write Whats your mind"
              id=""
            ></textarea>
          ) : (
            <p>{item?.content}</p>
          )}
          <button onClick={() => deleteHandler(item)}>Delete</button>
          {editMode && selectedPost.id == item.id ? (
            <button onClick={() => updateHandler(item)}>Save</button>
          ) : (
            <button
              onClick={() => {
                setSelectedPost(item);
                setEditMode(true);
                setEditText(item.content);
              }}
            >
              Edit
            </button>
          )}
          <hr />
        </>
      ))}
    </div>
  );
};

export default WelcomePage;
