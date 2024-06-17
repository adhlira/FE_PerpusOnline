const Navbar = () => {
  return (
    <>
      <div className="container mx-auto mt-2">
        <div className="flex flex-row md:w-auto w-full bg-bar text-putih">
          <img src="/src/assets/logoPerpus.png" alt="logo" width="60px" />
          <div className="ml-2">
            <h1 className="text-3xl sm:text-4xl mt-2">Perpustakaan</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
