import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function App() {
  function loginHandler() {}
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4 border-2 m-4 p-6 w-80">
        <div className="flex flex-col w-full">
          <label className="mb-1">Username</label>
          <input
            type="text"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1">Password</label>
          <input
            type="password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={loginHandler}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
