import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import { rupiah } from "./libs/ToRupiah";

function App() {
  const listBarang = [
    { namaBarang: "Sapu", kodeBarang: 1, harga: 10000 },
    {
      namaBarang: "Gunting",
      kodeBarang: 2,
      harga: 20000,
    },
    {
      namaBarang: "Taplak",
      kodeBarang: 3,
      harga: 30000,
    },
  ];

  const [report, setReport] = useState([]);

  const handleAddProduct = (kode, nama, harga, operasi) => {
    let listReport = [...report];
    if (listReport.find((item) => item.kodeBarang === kode)) {
      const found = listReport.find((item) => item.kodeBarang === kode);
      if (operasi === "tambah5") {
        found.jumlah += 5;
        return setReport(listReport);
      }
      if (operasi === "kurang5" && found.jumlah > 5) {
        found.jumlah -= 5;
        return setReport(listReport);
      }
      if (operasi === "kurang5" && found.jumlah - 5 <= 0) {
        return;
      }
      if (operasi === "kurang" && found.jumlah - 1 < 0) {
        return;
      }
      if (operasi === "tambah") {
        found.jumlah += 1;
        return setReport(listReport);
      }
      if (operasi === "kurang" && found.jumlah > 0) {
        found.jumlah -= 1;
        return setReport(listReport);
      }
    }
    if (
      (operasi == "kurang" || operasi == "kurang5") &&
      !listReport.find((item) => item.kodeBarang === kode)
    ) {
      return null;
    }
    if (
      !listReport.find((item) => item.kodeBarang === kode) &&
      operasi == "tambah5"
    ) {
      listReport.push({
        namaBarang: nama,
        kodeBarang: kode,
        harga: harga,
        jumlah: 5,
      });
      return setReport(listReport);
    } else {
      listReport.push({
        namaBarang: nama,
        kodeBarang: kode,
        harga: harga,
        jumlah: 1,
      });
      setReport(listReport);
    }
  };

  return (
    <>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga Barang</th>
                <th>Tombol Perintah</th>
              </tr>
            </thead>
            <tbody>
              {listBarang.map((item, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td>{item.kodeBarang}</td>
                    <td>{item.namaBarang}</td>
                    <td>{rupiah(item.harga)}</td>
                    <td className="flex gap-4 justify-center">
                      <button
                        onClick={() =>
                          handleAddProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga,
                            "kurang5"
                          )
                        }
                        className="btn btn-primary py-2 w-12"
                      >
                        -5
                      </button>
                      <button
                        onClick={() =>
                          handleAddProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga,
                            "kurang"
                          )
                        }
                        className="btn btn-primary w-12"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          handleAddProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga,
                            "tambah"
                          )
                        }
                        className="btn btn-primary w-12"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          handleAddProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga,
                            "tambah5"
                          )
                        }
                        className="btn btn-primary py-2 w-12"
                      >
                        +5
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Cart report={report} />
    </>
  );
}

export default App;
