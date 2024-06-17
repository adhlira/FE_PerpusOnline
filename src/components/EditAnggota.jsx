/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const Sidebar = () => {
  const [anggota, setAnggota] = useState({});
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const { id } = useParams();

  const url = `http://localhost:3000/anggota/${id}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setAnggota({ ...anggota, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setAnggota(response.data);
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(url, { nis: anggota.nis, nama: anggota.nama, jenis_kelamin: anggota.jenis_kelamin, telp: anggota.telp });
      alert("Data Berhasil diedit !");
      console.log("Respon dari server : ", response.data);
      navigate("/anggota");
    } catch (error) {
      console.log(error);
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
          <div className="flex-1 md:ml-5 ml-3 mt-5">
          <div className="flex justify-between">
              <p className="sm:text-3xl text-2xl font-semibold">Edit Data Anggota</p>

              <Link to="../anggota">
                <button className="border bg-button1 text-putih hover:bg-button1hover rounded-lg sm:mr-3 p-2">Kembali</button>
              </Link>
            </div>
            <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="nis">
                  NIS
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nis"
                  type="text"
                  name="nis"
                  value={anggota.nis}
                  onChange={handleChange}
                  placeholder="Masukkan NIS"
                />
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="nama">
                  Nama
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nama"
                  type="text"
                  name="nama"
                  value={anggota.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="jenis_kelamin">
                  Jenis Kelamin
                </label>
                <input className="form-radio" id="jenis_kelamin" type="radio" name="jenis_kelamin" value="Laki-Laki" checked={anggota.jenis_kelamin === "Laki-Laki"} onChange={handleChange} />
                <label htmlFor="laki-laki" className="font-semibold md:font-medium ml-3">
                  Laki - Laki
                </label>
                <input className="form-radio ml-5" id="jenis_kelamin" type="radio" name="jenis_kelamin" value="Perempuan" checked={anggota.jenis_kelamin === "Perempuan"} onChange={handleChange} />
                <label htmlFor="perempuan" className="font-semibold md:font-medium ml-3">
                  Perempuan
                </label>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="telp">
                  Telp
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telp"
                  type="text"
                  name="telp"
                  value={anggota.telp}
                  onChange={handleChange}
                  placeholder="Masukkan telp"
                />
              </div>
              <button type="submit" className="px-16 py-2 bg-button2 text-putih hover:bg-button2hover border rounded mt-10">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
