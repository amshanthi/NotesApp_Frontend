function Navbar({ user, handleLogout }) {
  console.log("Navbar calling");
  const date = new Date();
  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 md:px-8 py-3 shadow-lg">
      <h1 className="text-white text-base md:text-lg font-semibold">
        Hi {user},
      </h1>

      <div className="flex flex-col items-center leading-tight">
        <h1 className="text-white text-xs md:text-sm font-medium">
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </h1>
        <p className="text-gray-300 text-[10px] md:text-xs">
          {date.toLocaleDateString("en-US", { weekday: "short" })}
        </p>
      </div>

      <button
        className="text-white bg-red-500 px-3 md:px-4 py-1.5 rounded-md hover:bg-red-600 active:scale-95 transition duration-150"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
