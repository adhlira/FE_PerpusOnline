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

const EditBuku = () => {
  const [buku, setBuku] = useState({});
  const [pengarang, setPengarang] = useState([]);
  const [penerbit, setPenerbit] = useState([]);
  const [rak, setRak] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { id } = useParams();
  const url = `http://localhost:3000/buku/${id}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setBuku({ ...buku, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setBuku(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pengarang");
        setPengarang(response.data);
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
        const response = await axios.get("http://localhost:3000/penerbit");
        setPenerbit(response.data);
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
        const response = await axios.get("http://localhost:3000/rak");
        setRak(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      pengarang_id: +buku.pengarang_id,
      penerbit_id: +buku.penerbit_id,
      rak_id: +buku.rak_id,
      judul: buku.judul,
      tahun_terbit: +buku.tahun_terbit,
      jumlah: +buku.jumlah,
      isbn: buku.isbn,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil diubah !");
      navigate("/buku");
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
              <h2 className="md:text-3xl text-2xl font-semibold">Edit Data Buku</h2>
              <Link to={"../buku"}>
                <button className="rounded-lg bg-button1 hover:bg-button1hover text-putih p-2 border md:mr-8">Kembali</button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="pengarang">
                    Pengarang
                  </label>
                  <select className="form-select px-10 py-2 border w-full rounded-lg" name="pengarang_id" value={buku.pengarang_id} onChange={handleChange}>
                    <option className="text-center md:text-base text-xs" value="">
                      Pilih
                    </option>
                    {pengarang.map((item) => (
                      <option className="md:text-base text-xs" key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="penerbit">
                    Penerbit
                  </label>
                  <select className="form-select px-10 py-2 border w-full rounded-lg" name="penerbit_id" value={buku.penerbit_id} onChange={handleChange}>
                    <option className="text-center md:text-base text-xs" value="">
                      Pilih
                    </option>
                    {penerbit.map((item) => (
                      <option className="md:text-base text-xs" key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="rak">
                    Rak
                  </label>
                  <select className="form-select px-10 py-2 border w-full rounded-lg" name="rak_id" value={buku.rak_id} onChange={handleChange}>
                    <option className="text-center md:text-base text-xs" value="">
                      Pilih
                    </option>
                    {rak.map((item) => (
                      <option className="md:text-base text-xs" key={item.id} value={item.id}>
                        {item.lokasi}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="judul">
                    Judul
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="judul"
                    type="text"
                    name="judul"
                    value={buku.judul}
                    onChange={handleChange}
                    placeholder="Masukkan Judul"
                  />
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="tahun_terbit">
                    Tahun Terbit
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tahun_terbit"
                    type="text"
                    name="tahun_terbit"
                    value={buku.tahun_terbit}
                    onChange={handleChange}
                    placeholder="Masukkan Tahun Terbit"
                  />
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="jumlah">
                    Jumlah
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="jumlah"
                    type="text"
                    name="jumlah"
                    value={buku.jumlah}
                    onChange={handleChange}
                    placeholder="Masukkan Jumlah"
                  />
                </div>
                <div className="mb-4 mt-5">
                  <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="isbn">
                    ISBN
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="isbn"
                    type="text"
                    name="isbn"
                    value={buku.isbn}
                    onChange={handleChange}
                    placeholder="Masukkan ISBN"
                  />
                </div>
                <button type="submit" className="px-16 py-2 border rounded mt-16 bg-button2 hover:bg-button2hover text-putih">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditBuku;
