import { rupiah } from "../libs/ToRupiah";

const Cart = ({ report }) => {
  const originalPrice = report?.reduce((a, b) => a + b.harga * b.jumlah, 0);
  const diskon = report.reduce((a, b) => a + b.harga * b.jumlah * 0.1, 0);
  const total = originalPrice - diskon;

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
                    {rupiah(item.jumlah > 10 ? item.harga * item.jumlah * 0.1 : 0)}
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
