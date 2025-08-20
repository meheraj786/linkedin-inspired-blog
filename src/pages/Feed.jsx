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
import Container from "../layouts/Container";
import Flex from "../layouts/Flex";
import ProfileInfoSidebar from "../layouts/ProfileInfoSidebar";
import PostForm from "../components/PostForm/PostForm";
import AddUser from "../components/AddUser/AddUser";
import PostList from "../components/PostList.jsx/PostList";
import CustomLoader from "../layouts/CustomLoader";

const Feed = () => {
  const auth = getAuth();
  const [description, setDescription] = useState("");
  const db = getDatabase();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);
  const user = useSelector((state) => state.userInfo.value);
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedText, setEditText] = useState("");
  const [editName, setEditName] = useState(false);
  const [editedNameText, setEditedNameText] = useState(user?.displayName);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {

    if (user?.emailVerified) {
      setVerified(true);
    }
    setLoading(false)
  });
  useEffect(() => {
        if (user && verified) {
      setLoading(false)
    }
  }, [user, verified])
  
  
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
      dispatch(setUser(auth.currentUser));
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

  
  if (loading) return <CustomLoader />;
  if (!user) return <Navigate to="/" />;
  if (user && !verified) return <div>Please Verify Your Email</div>;

  return (
    // <div>
    //   
    //   <p>{user?.uid}</p>
    //   {editName ? (
    //     <input
    //       type="text"
    //       value={editedNameText}
    //       onChange={(e) => setEditedNameText(e.target.value)}
    //     />
    //   ) : (
    //     <p>{user?.displayName}</p>
    //   )}
    //   {editName ? (
    //     <button
    //       onClick={() => {
    //         updateNameHandler();
    //         setEditName(false);
    //       }}
    //     >
    //       Save
    //     </button>
    //   ) : (
    //     <button onClick={() => setEditName(true)}>Edit Name</button>
    //   )}

    //   <p>{user?.email}</p>
    //   <p>{user?.emailVerified}</p>
    //   {verified ? "User is Verified" : "User is not verified"}
    //   {/* {
    //     users.map((item)=>(
    //       <>
    //       <p>{item?.username}</p>
    //       <p>{item?.email}</p>
    //       </>
    //     ))
    //   } */}
    //   <div>
    //     <textarea
    //       name=""
    //       onKeyDown={(e) => e.key == "Enter" && postHandler()}
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       className="border"
    //       placeholder="Write Whats your mind"
    //       id=""
    //     ></textarea>
    //     <button onClick={postHandler}>Post</button>
    //   </div>
    //   <hr />
    //   {posts.map((item) => (
    //     <>
    //       <p>{item?.whoPostName}</p>
    //       <p>{moment(item?.time).fromNow()}</p>
    //       {editMode && selectedPost.id == item.id ? (
    //         <textarea
    //           name=""
    //           onKeyDown={(e) => e.key == "Enter" && updateHandler()}
    //           value={editedText}
    //           onChange={(e) => setEditText(e.target.value)}
    //           className="border"
    //           placeholder="Write Whats your mind"
    //           id=""
    //         ></textarea>
    //       ) : (
    //         <p>{item?.content}</p>
    //       )}
    //       <button onClick={() => deleteHandler(item)}>Delete</button>
    //       {editMode && selectedPost.id == item.id ? (
    //         <button onClick={() => updateHandler(item)}>Save</button>
    //       ) : (
    //         <button
    //           onClick={() => {
    //             setSelectedPost(item);
    //             setEditMode(true);
    //             setEditText(item.content);
    //           }}
    //         >
    //           Edit
    //         </button>
    //       )}
    //       <hr />
    //     </>
    //   ))}
    // </div>
    <div className="bg-bg w-full min-h-[100vh] pt-[24px]">
      <Toaster position="top-right" />
      <Container>
        <Flex className="items-start justify-between">
          <ProfileInfoSidebar />
          <Flex className="flex-col justify-center items-center mx-auto">
            <PostForm />
            <PostList />
          </Flex>
          <AddUser />
        </Flex>
      </Container>
    </div>
  );
};

export default Feed;
