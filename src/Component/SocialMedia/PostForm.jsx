import { useEffect, useState } from "react";
import Button from "./UiComponent/Button";
import InputBox from "./UiComponent/InputBox";

function PostForm({ isEdit = false, existingPost = null, onFinish }) {
  const [data, setData] = useState({
    title: "",
    detail: "",
    value: 0,
    maxi: 1000,
  });

  useEffect(() => {
    if (existingPost != null) {
      setData((prev) => {
        return {
          ...prev,
          title: existingPost.title,
          detail: existingPost.detail,
        };
      });
    }
  }, [existingPost]);

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (data.title !== "" && data.detail !== "") {
      const token = localStorage.getItem("token");
      const res = await fetch(
        isEdit
          ? `http://localhost:5000/edit/${existingPost._id}`
          : "http://localhost:5000/sent",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: data.title,
            detail: data.detail,
          }),
        },
      );
      alert(`${isEdit ? "Note updated!" : " Note created!"}`);
      setData((prev) => {
        return { ...prev, title: "", detail: "", value: 0, maxi: 1000 };
      });
      onFinish();
    }
  };

  const handleTextarea = (e) => {
    if (e.target.value.length <= data.maxi) {
      setData((prev) => {
        return {
          ...prev,
          value: existingPost
            ? existingPost.detail.length
            : e.target.value.length,
          detail: e.target.value,
        };
      });
    }
  };

  return (
    <div className="min-h-[50vh] flex flex-col  items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {isEdit ? "Update Note" : "Create Note"}
      </h2>
      <form
        onSubmit={handleNewPost}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
      >
        <InputBox
          styles={`border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-md p-2`}
          type="text"
          placeholder="Title"
          value={data.title}
          changeHandler={(e) =>
            setData((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />

        <textarea
          className={`resize-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-md p-2 min-h-[120px] ${data.value >= data.maxi ? "focus:ring-3 focus:ring-red-500" : "bg-none"}`}
          placeholder="Write description here"
          value={data.detail}
          onChange={handleTextarea}
        />
        <p className="flex justify-end">
          {existingPost ? data.detail.length : data.value}/{data.maxi}
        </p>

        <Button
          text={isEdit ? "Update" : "Submit"}
          type="submit"
          styles={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200`}
        />
      </form>
    </div>
  );
}

export default PostForm;
