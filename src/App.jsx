import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import { hitungDiskon, rupiah } from "./libs/Funct-libs";

function App() {
  const listBarang = [
    {
      namaBarang: "Sapu",
      kodeBarang: 1,
      harga: 10000,
    },
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
  const [discArr, setDiscArr] = useState([]);

  const handleAddOneProduct = (kode, nama, harga) => {
    let listReport = [...report];
    if (listReport.find((item) => item.kodeBarang === kode)) {
      const found = listReport.find((item) => item.kodeBarang === kode);
      found.jumlah += 1;
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    } else {
      listReport.push({
        namaBarang: nama,
        kodeBarang: kode,
        harga: harga,
        jumlah: 1,
      });
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    }
  };

  const handleAddFiveProduct = (kode, nama, harga) => {
    let listReport = [...report];
    if (listReport.find((item) => item.kodeBarang === kode)) {
      const found = listReport.find((item) => item.kodeBarang === kode);
      found.jumlah += 5;
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    } else {
      listReport.push({
        namaBarang: nama,
        kodeBarang: kode,
        harga: harga,
        jumlah: 5,
      });
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    }
  };

  const handleRemoveOneProduct = (kode) => {
    let listReport = [...report];
    const found = listReport.find((item) => item.kodeBarang === kode);
    if (
      listReport.find((item) => item.kodeBarang === kode) &&
      found.jumlah > 1
    ) {
      found.jumlah -= 1;
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    } else {
      return handleDelete(kode);
    }
  };

  const handleRemoveFiveProduct = (kode) => {
    let listReport = [...report];
    const found = listReport.find((item) => item.kodeBarang === kode);
    if (
      listReport.find((item) => item.kodeBarang === kode) &&
      found.jumlah > 5
    ) {
      found.jumlah -= 5;
      setReport(listReport);
      return setDiscArr(hitungDiskon(report));
    } else {
      return handleDelete(kode);
    }
  };

  const handleDelete = (kode) => {
    let arr = [...report];
    setReport(arr.filter((item) => item.kodeBarang !== kode));
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
                        onClick={() => handleRemoveFiveProduct(item.kodeBarang)}
                        className="btn btn-primary py-2 w-12"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleRemoveOneProduct(item.kodeBarang)}
                        className="btn btn-primary w-12"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          handleAddOneProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga
                          )
                        }
                        className="btn btn-primary w-12"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          handleAddFiveProduct(
                            item.kodeBarang,
                            item.namaBarang,
                            item.harga
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
      <Cart report={report} discArr={discArr} handleDelete={handleDelete} />
    </>
  );
}

export default App;
