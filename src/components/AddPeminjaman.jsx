/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
import { FaRotateRight } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const TambahBuku = () => {
  const [data, setData] = useState({ anggota_id: "", petugas_id: "", tanggal_pinjam: "", tanggal_kembali: "", buku_id: "" });
  const [anggota, setAnggota] = useState([]);
  const [petugas, setPetugas] = useState([]);
  const [buku, setBuku] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const url = "http://localhost:3000/peminjaman";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/anggota");
        setAnggota(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/petugas");
        setPetugas(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buku");
        setBuku(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      anggota_id: +data.anggota_id,
      petugas_id: +data.petugas_id,
      buku_id: +data.buku_id,
      tanggal_pinjam: new Date(data.tanggal_pinjam),
      tanggal_kembali: new Date(data.tanggal_kembali),
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/peminjaman");
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
            <div className="flex flex-row justify-between">
              <h2 className="md:text-3xl text-2xl font-semibold">Tambah Data Peminjaman</h2>
              <Link to={"../peminjaman"}>
                <button className="rounded-lg p-2 bg-button1 hover:bg-button1hover text-putih border md:mr-3">Kembali</button>
              </Link>
            </div>
            <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="anggota">
                  Petugas
                </label>
                <select className="form-select px-10 py-2 border w-full rounded-lg" name="petugas_id" value={data.petugas_id} onChange={handleChange}>
                  <option className="text-center md:text-base text-xs" value="">
                    Pilih
                  </option>
                  {petugas.map((item) => (
                    <option className="md:text-base text-xs" key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="anggota">
                  Anggota
                </label>
                <select className="form-select px-10 py-2 border w-full rounded-lg" name="anggota_id" value={data.anggota_id} onChange={handleChange}>
                  <option className="text-center md:text-base text-xs" value="">
                    Pilih
                  </option>
                  {anggota.map((item) => (
                    <option className="md:text-base text-xs" key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="buku_id">
                  Buku
                </label>
                <select className="form-select px-10 py-2 border w-full rounded-lg" name="buku_id" value={data.buku_id} onChange={handleChange}>
                  <option className="text-center md:text-base text-xs" value="">
                    Pilih
                  </option>
                  {buku.map((item) => (
                    <option className="md:text-base text-xs" key={item.id} value={item.id}>
                      {item.judul}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="tanggal_pinjam">
                  Tanggal Pinjam
                </label>
                <input
                  type="datetime-local"
                  name="tanggal_pinjam"
                  value={data.tanggal_pinjam}
                  onChange={handleChange}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="tanggal_kembali">
                  Tanggal Kembali
                </label>
                <input
                  type="datetime-local"
                  name="tanggal_kembali"
                  value={data.tanggal_kembali}
                  onChange={handleChange}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button type="submit" className="px-16 py-2 bg-button2 hover:bg-button2hover text-putih border rounded mt-16">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default TambahBuku;
