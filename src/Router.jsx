import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Petugas from "./pages/AllPetugas.jsx";
import Anggota from "./pages/AllAnggota.jsx";
import tambahpetugas from "./pages/AddPetugas.jsx";
import tambahAnggota from "./pages/AddAnggota.jsx";
import editAnggota from "./pages/EditAnggota.jsx";
import Buku from "./pages/AllBuku.jsx";
import tambahBuku from "./pages/AddBuku.jsx";
import BukuDetail from "./pages/DetailBuku.jsx";
import EditBuku from "./pages/EditBuku.jsx";
import Peminjaman from "./pages/AllPeminjaman.jsx";
import DetailPinjam from "./pages/DetailPeminjaman.jsx";
import tambahPeminjaman from "./pages/AddPeminjaman.jsx";
import UbahPeminjaman from "./pages/EditPeminjaman.jsx";
import AllPengembalian from "./pages/AllPengembalian.jsx";
import DetailPengembalian from "./pages/DetailPengembalian.jsx";
import AddPengembalian from "./pages/AddPengembalian.jsx";

const router = createBrowserRouter([
  {
    path: "",
    Component: Dashboard,
  },
  {
    path: "petugas",
    Component: Petugas,
  },
  {
    path: "anggota",
    Component: Anggota,
  },
  {
    path: "petugas/tambah",
    Component: tambahpetugas,
  },
  {
    path: "anggota/tambah",
    Component: tambahAnggota,
  },
  {
    path: "anggota/edit/:id",
    Component: editAnggota,
  },
  {
    path: "buku",
    Component: Buku,
  },
  {
    path: "buku/tambah",
    Component: tambahBuku,
  },
  {
    path: "buku/detail/:id",
    Component: BukuDetail,
  },
  {
    path: "buku/edit/:id",
    Component: EditBuku,
  },
  {
    path: "peminjaman",
    Component: Peminjaman,
  },
  {
    path: "peminjaman/detail/:id",
    Component: DetailPinjam,
  },
  {
    path: "peminjaman/tambah",
    Component: tambahPeminjaman,
  },
  {
    path: "peminjaman/edit/:id",
    Component: UbahPeminjaman,
  },
  {
    path: "pengembalian",
    Component: AllPengembalian,
  },
  {
    path: "pengembalian/detail/:id",
    Component: DetailPengembalian,
  },
  {
    path: "pengembalian/tambah",
    Component: AddPengembalian,
  },
]);

export default router;
