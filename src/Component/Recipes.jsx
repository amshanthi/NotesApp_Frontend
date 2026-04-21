import { useRef, useState } from "react";
import ProductList from "./ProductList";
import { gsap } from "gsap";

function Recipes() {
  let [search, setSearch] = useState("");
  let inputRef = useRef();

  const changeHandler = (e) => {
    clearTimeout(inputRef.current);
    inputRef.current = setTimeout(() => {
      console.log("Debouncing concept here");
      setSearch(e.target.value);
    }, 300);
    // normal coding
    // console.log("normal  here");
    // setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100">
      <div className="flex justify-between items-center p-3 bg-white shadow-md ">
        <h1 className="text-3xl font-bold text-orange-600 tracking-wide md:w-full">
          🍽 Recipes
        </h1>
        <input
          ref={inputRef}
          onChange={changeHandler}
          type="text"
          placeholder="Search recipes"
          className="border-2 border-orange-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <ProductList search={search} />
    </div>
  );
}

export default Recipes;
