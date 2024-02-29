import { useState } from "react";
import { hitungDiskon, rupiah } from "../libs/ToRupiah";
import { useEffect } from "react";

const Cart = ({ report }) => {
  const [discArr, setDiscArr] = useState([])
  const [originalPrice, setOriginalPrice] = useState(0)
  const [totalDiskon, setTotalDiskon] = useState(0)
  const [total, setTotal] = useState(0)

useEffect(()=> {
  setDiscArr(hitungDiskon(report))
  setOriginalPrice(report?.reduce((a, b) => a + b.harga * b.jumlah, 0))
  setTotalDiskon(discArr.reduce((a, b) => a + b, 0))
  setTotal(originalPrice-totalDiskon)

},[discArr])
  
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
            </tr>
          </thead>
          <tbody>
            {report?.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{item.kodeBarang}</td>
                  <td>{item.namaBarang}</td>
                  <td>{rupiah(item.harga)}</td>
                  <td>{item.jumlah}</td>
                  <td>
                    {rupiah(item.jumlah>10 ? item.harga * item.jumlah * 0.1 : 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-10">Total Belanjaan Anda : {rupiah(total)}</p>
      </div>
    </div>
  );
};

export default Cart;
