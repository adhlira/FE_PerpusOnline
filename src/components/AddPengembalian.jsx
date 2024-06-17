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
import { differenceInDays } from "date-fns";

const TambahPengembalian = () => {
  const [data, setData] = useState({ peminjaman_id: "", anggota_id: "", petugas_id: "", tanggal_pengembalian: "", denda: "", buku_id: "" });
  const [peminjaman, setPeminjaman] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selisih, setSelisih] = useState(null);
  const [denda, setDenda] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const url = "http://localhost:3000/pengembalian";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/peminjaman");
        setPeminjaman(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = peminjaman.find((item) => item.id == selectedId);
    setSelectedData(selected);
    console.log(selected);
  };

  const formatToLocalDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const hitungSelisih = () => {
    const tanggal_kembali = new Date(selectedData.tanggal_kembali);
    const tanggal_pengembalian = new Date(data.tanggal_pengembalian);
    const selisihHari = differenceInDays(tanggal_pengembalian, tanggal_kembali);
    setSelisih(selisihHari);
    console.log(selisihHari);

    const hitungDenda = selisihHari > 0 ? selisihHari * 1000 : 0;
    setDenda(hitungDenda);
    console.log(hitungDenda);
    console.log(tanggal_kembali);
    console.log(tanggal_pengembalian);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      peminjaman_id: +selectedData.id,
      anggota_id: +selectedData.anggota_id,
      petugas_id: +selectedData.petugas_id,
      buku_id: +selectedData.Detail_Peminjaman?.[0]?.buku_id,
      tanggal_pengembalian: new Date(data.tanggal_pengembalian),
      denda: +denda,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/pengembalian");
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
              <h2 className="md:text-3xl text-2xl font-semibold">Tambah Data Pengembalian</h2>
              <Link to={"../pengembalian"}>
                <button className="rounded-lg p-2 bg-button1 hover:bg-button1hover text-putih border md:mr-3">Kembali</button>
              </Link>
            </div>
            <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="peminjaman_id">
                  NIS Anggota
                </label>
                <select className="form-select px-10 py-2 border w-full rounded-lg" name="peminjaman_id" onChange={handleSelectChange}>
                  <option className="text-center md:text-base text-xs" value="">
                    Pilih
                  </option>
                  {peminjaman.map((item) => (
                    <option className="md:text-base text-xs" key={item.id} value={item.id}>
                      {item.Anggota?.nis}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="anggota_id">
                  Nama Anggota
                </label>
                <input
                  type="text"
                  name="anggota_id"
                  value={selectedData.Anggota?.nama}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="petugas_id">
                  Nama Petugas
                </label>
                <input
                  type="text"
                  name="petugas_id"
                  value={selectedData.Petugas?.nama}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="buku_id">
                  Buku
                </label>
                <input
                  type="text"
                  name="buku_id"
                  value={selectedData.Detail_Peminjaman?.[0]?.Buku?.judul}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="isbn">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={selectedData.Detail_Peminjaman?.[0]?.Buku?.isbn}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="tanggal_kembali">
                  Tanggal Kembali
                </label>
                <input
                  type="datetime-local"
                  name="tanggal_kembali"
                  value={formatToLocalDateTime(selectedData.tanggal_kembali)}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="tanggal_pengembalian">
                  Tanggal Pengembalian
                </label>
                <input
                  type="datetime-local"
                  name="tanggal_pengembalian"
                  value={data.tanggal_pengembalian}
                  onChange={handleChange}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></input>
                <button onClick={hitungSelisih} className="border bg-button2 hover:bg-button2hover text-putih rounded-lg px-1 py-2 mt-5">
                  Hitung Denda
                </button>
              </div>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="denda">
                  Denda (Rp.)
                </label>
                <input
                  type="text"
                  name="denda"
                  value={denda}
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                ></input>
              </div>
              <button type="submit" className="px-16 py-2 mt-7 border rounded-lg bg-button2 hover:bg-button2hover text-putih">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default TambahPengembalian;
