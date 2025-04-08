const Header = () => {
  return (
    <div className="w-full h-12 p-4 bg-white/50 flex flex-row justify-between items-center px-4 shadow-md">
      <h1 className="text-xl font-bold">Library</h1>
      <button className="bg-white hover:bg-white/50 rounded-md p-1">
        Login
      </button>
    </div>
  );
};

export default Header;
