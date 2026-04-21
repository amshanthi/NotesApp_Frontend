import { useState } from "react";
import Button from "./UiComponent/Button";
import InputBox from "./UiComponent/InputBox";

function PostItem({ post, setMode, setisExist, handleDeleted }) {
  const handleEdit = (e) => {
    setMode("edit");
    setisExist(post);
  };

  const handleView = (e) => {
    setMode("view");
    setisExist(post);
  };
  return (
    <div className=" bg-white shadow-md rounded-lg p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-blue-300 border-b-2">
      <h3 className=" font-bold text-blue-600  md:w-1/4 ">{post.title}</h3>
      <p className="text-sm text-gray-600 md:w-1/4 font-medium ">
        {new Date(post.createdAt).toLocaleDateString("en-US")},{" "}
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </p>

      <p className="text-gray-600 text-sm md:w-2/4 flex justify-center">
        {post.detail.length > 30
          ? post.detail.slice(0, 30) + "..."
          : post.detail}
      </p>

      <div className="flex gap-2 ">
        <Button
          text="View"
          onClick={handleView}
          styles={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-semibold`}
        />
        <Button
          text="Edit"
          onClick={handleEdit}
          styles={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-semibold`}
        />
        <Button
          text="Delete"
          onClick={() => {
            handleDeleted(post._id);
          }}
          styles={`flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-semibold`}
        />
      </div>
    </div>
  );
}

export default PostItem;
