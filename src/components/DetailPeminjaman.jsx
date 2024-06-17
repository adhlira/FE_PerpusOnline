import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const Detail = () => {
  const [pinjam, setPinjam] = useState({});
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { id } = useParams();
  const EndPoint = `http://localhost:3000/peminjaman/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(EndPoint);
        setPinjam(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format tanggal saja
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
          <div className="flex-1 md:ml-5 ml-3 mt-5">
            <div className="flex flex-row justify-between">
              <p className="md:text-3xl text-2xl font-semibold">Detail Peminjaman</p>
              <Link to={"../peminjaman"}>
                <button className="rounded-lg p-2 bg-button1 hover:bg-button1hover text-putih border md:mr-2">Kembali</button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-auto min-w-full text-center border mt-8">
                <thead>
                  <tr>
                    <th className="w-2/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Petugas</th>
                    <th className="w-2/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Anggota</th>
                    <th className="w-1/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">NIS</th>
                    <th className="w-3/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Judul</th>
                    <th className="w-3/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Isbn</th>
                    <th className="md:w-2/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Tanggal Pinjam</th>
                    <th className="md:w-2/12 py-2 px-4 block md:table-cell md:border md:text-center text-left">Tanggal Kembali</th>
                  </tr>
                </thead>
                <tbody className="border">
                  <tr className="border-b md:border-none block md:table-row">
                    <td className="block border  md:table-cell">{pinjam.Petugas?.nama}</td>
                    <td className="block border  md:table-cell">{pinjam.Anggota?.nama}</td>
                    <td className="block border  md:table-cell">{pinjam.Anggota?.nis}</td>
                    <td className="block border  md:table-cell">{pinjam.Detail_Peminjaman?.[0]?.Buku?.judul}</td>
                    <td className="block border  md:table-cell">{pinjam.Detail_Peminjaman?.[0]?.Buku?.isbn}</td>
                    <td className="block border  md:table-cell">{formatDate(pinjam.tanggal_pinjam)}</td>
                    <td className="block border  md:table-cell">{formatDate(pinjam.tanggal_kembali)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
