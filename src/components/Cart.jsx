/* eslint-disable react/prop-types */

import { rupiah } from "../libs/Funct-libs";

const Cart = ({ report, setReport, discArr }) => {
  const handleDelete = (kode) => {
    let arr = [...report];
    const filtered = arr.filter((item) => item.kodeBarang !== kode);
    console.log(filtered);
    setReport(arr.filter((item) => item.kodeBarang !== kode));
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Harga Barang</th>
              <th>Jumlah</th>
              <th>Diskon</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{item.kodeBarang}</td>
                  <td>{item.namaBarang}</td>
                  <td>{rupiah(item.harga)}</td>
                  <td>{item.jumlah}</td>
                  <td>
                    {rupiah(
                      item.jumlah > 10 ? item.harga * item.jumlah * 0.1 : 0
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(item.kodeBarang)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-10">
          Total Belanjaan Anda :{" "}
          {rupiah(
            report?.reduce((a, b) => a + b.harga * b.jumlah, 0) -
              discArr.reduce((a, b) => a + b, 0)
          )}
        </p>
      </div>
    </div>
  );
};

export default Cart;
