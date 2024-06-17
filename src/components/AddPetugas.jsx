/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const Sidebar = () => {
  const [data, setData] = useState({ username: "", password: "", nama: "", telp: "" });
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const url = "http://localhost:3000/petugas";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
      nama: data.nama,
      telp: data.telp,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/petugas");
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
          <div className="flex-1 sm:ml-5 ml-3 mt-5">
            <div className="flex justify-between">
              <p className="sm:text-3xl text-2xl font-semibold">Tambah Data Petugas</p>

              <Link to="../petugas">
                <button className="border bg-button1 text-putih hover:bg-button1hover rounded-lg sm:mr-3 p-2">Kembali</button>
              </Link>
            </div>
            <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                />
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
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
                  value={data.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="telp">
                  No Telp
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telp"
                  type="text"
                  name="telp"
                  value={data.telp}
                  onChange={handleChange}
                  placeholder="Masukkan telp"
                />
              </div>
              <button type="submit" className="px-16 py-2 border bg-button2 text-putih hover:bg-button2hover rounded mt-10 focus:outline-none focus:shadow-outline">
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
