import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import Pagination from "./Pagination.jsx";

const Sidebar = () => {
  const [petugas, setPetugas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const itemsPerPage = 5;
  const EndPoint = "http://localhost:3000/petugas";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(EndPoint);
        setPetugas(response.data);
      } catch (error) {
        console.error("Gagal melakukan fetch data", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Menghitung data yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = petugas.slice(indexOfFirstItem, indexOfLastItem);

  const deleteData = async (id) => {
    const cek = confirm("Anda yakin ingin menghapus ini ?");
    if (cek == true) {
      try {
        await axios.delete(`${EndPoint}/${id}`);
        setPetugas(petugas.filter((item) => item.id !== id));
        alert("Data berhasil di hapus");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    } else {
      navigate("/petugas");
    }
  };

  return (
    <>
      <div className="container mx-auto border">
        <div className="flex min-h-screen">
          <button className="sm:hidden p-4 border bg-bar text-putih text-center" onClick={() => setSideBarOpen(!sideBarOpen)}>
            <FaBars />
          </button>
          <div className={`flex-none sm:w-1/4 w-full bg-bar text-putih ${sideBarOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaHouse className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/"}>Dashboard</Link>
              </div>
            </div>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaUser className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/petugas"}>Petugas</Link>
              </div>
            </div>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaUsers className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/anggota"}>Anggota</Link>
              </div>
            </div>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaBook className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/buku"}>Buku</Link>
              </div>
            </div>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaFile className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/peminjaman"}>Peminjaman</Link>
              </div>
            </div>
            <div className="flex flex-row hover:bg-hover mt-5">
              <div className="mt-1 ml-20">
                <FaRotateRight className="size-5" />
              </div>
              <div className="ml-2 mb-1 text-xl">
                <Link to={"/pengembalian"}>Pengembalian</Link>
              </div>
            </div>
          </div>
          <div className="flex-1 sm:ml-5 ml-3 mt-5">
            <div className="flex flex-row justify-between">
              <p className="sm:text-3xl text-2xl font-semibold">Data Petugas</p>
              <Link to={"tambah"}>
                <button className="rounded-lg bg-button1 text-putih hover:bg-button1hover p-2 border md:mr-3">Tambah Data</button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-auto min-w-full border mt-10">
                <thead>
                  <tr>  
                    <th className="md:w-1/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">No</th>
                    <th className="md:w-2/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Username</th>
                    <th className="md:w-3/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Nama</th>
                    <th className="md:w-3/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Telp</th>
                    <th className="md:w-3/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody className="border text-center">
                  {currentItems?.map((item, index) => (
                    <tr className="border-b md:border-none block md:table-row" key={index}>
                      <td className="block border md:table-cell">{indexOfFirstItem + index + 1}</td>
                      <td className="block border md:table-cell">{item.username}</td>
                      <td className="block border md:table-cell ">{item.nama}</td>
                      <td className="block border md:table-cell ">{item.telp}</td>
                      <td className="border block md:table-cell">
                        <button onClick={() => deleteData(item.id)} className="rounded-lg p-2 border bg-merah text-putih hover:bg-merahhover ml-2">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div className="text-center mt-10">
              <Pagination totalItems={petugas.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
