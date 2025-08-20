import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import { ChevronDown , ThumbsUp,
  Heart,
  Lightbulb,
  Laugh } from 'lucide-react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { PiHandsClappingFill } from 'react-icons/pi';


const PostList = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Top');
  const [posts, setPosts]= useState([])
  const db= getDatabase()
  
    const reactions = [
    { icon: <ThumbsUp className="w-5 h-5 text-white" />, bg: "bg-blue-500" },
    { icon: <PiHandsClappingFill className="w-5 h-5  text-white" />, bg: "bg-green-500" },
    { icon: <Heart className="w-5 h-5 text-white" />, bg: "bg-red-500" },
    { icon: <Lightbulb className="w-5 h-5 text-white" />, bg: "bg-yellow-500" },
    { icon: <Laugh className="w-5 h-5 text-white" />, bg: "bg-cyan-500" },
  ];

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

  const sortOptions = ['Top', 'Recent', 'Following'];

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };
  return (
    <div className='pb-20'>

      {/* Sort dropdown section */}
      <div className=" relative  w-[555px] pt-1 ">
  
      <div className="h-[1px] top-[60%] left-0 w-[430px] absolute bg-[#1C1C1C]/30 border-gray-300"></div>
        <div className="flex items-center  justify-end">
          <div className="flex  items-center space-x-1">
            <span className="text-sm  text-gray-600">Sort by:</span>
            
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span>{selectedSort}</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSortSelect(option)}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                          selectedSort === option 
                            ? 'text-gray-900 font-medium' 
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {
        posts.map((post)=>(
          <PostCard post={post}/>

        ))
      }
    </div>
  )
}

export default PostList