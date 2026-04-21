import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import PostForm from "./PostForm";
import Button from "./UiComponent/Button";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";

function NewPost({ setIsLogIn, isLoginPage = true }) {
  const [mode, setMode] = useState("list");
  const [isExist, setisExist] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.username);
        setPosts(data.posts);
      });
  }, [mode]);

  const handleNewNote = () => {
    setMode("add");
    setisExist(null);
  };

  const handleDeleted = (Id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/delete/${Id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(posts.filter((post) => post._id != Id));
  };

  const handlePinned = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/pinned/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCheck(posts.filter((post) => (post.pinned === false ? true : false)));
  };

  const handleaddPost = () => {
    setisExist(null);
    setMode("list");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogIn(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar user={userName} handleLogout={handleLogout} />
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode !== "list" ? (
              <Button
                onClick={handleaddPost}
                text="← Back"
                styles={`mb-4 text-xl bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded`}
              />
            ) : (
              <div className="flex flex-row ">
                {posts.length === 1 ? "Note" : "Notes "}
                <p className="text-sm text-red-400 ">({posts.length})</p>
              </div>
            )}
          </h2>
          {mode === "list" && (
            <Button
              text="+ Add Note"
              onClick={handleNewNote}
              styles={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold`}
            />
          )}
        </div>
        {mode == "add" || mode == "edit" ? (
          <PostForm
            isEdit={mode == "add" ? false : true}
            existingPost={isExist ? isExist : null}
            onFinish={() => {
              setisExist(null);
              setMode("list");
            }}
          />
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-red-500 text-2xl">No note yet</p>
          </div>
        ) : mode === "list" ? (
          <div className="">
            {posts.map((post) => (
              <PostItem
                key={post._id}
                post={post}
                setMode={setMode}
                setisExist={setisExist}
                handleDeleted={handleDeleted}
              />
            ))}
          </div>
        ) : mode === "view" ? (
          <div className="p-2 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-blue-600 ">
              {isExist.title}
            </h2>
            <p className="flex justify-start text-gray-400 text-sm">
              {isExist.createdAt === isExist.updatedAt
                ? " Created on "
                : " Updated on "}{" "}
              {new Date(isExist.updatedAt).toLocaleString("en-US")}
            </p>
            <span className="md:flex md:flex-col text-gray-400 text-sm">
              {new Date(isExist.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </span>
            <p className="text-gray-700 my-4 ">
              Description:
              <span className="my-2 block w-full md:max-w-9xl break-normal whitespace-pre-line">
                {isExist.detail}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default NewPost;
