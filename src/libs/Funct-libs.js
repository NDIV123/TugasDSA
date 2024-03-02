 export const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  export const hitungDiskon = (item) => {
    let totalDiskon = []
    item.map(element => {
        if (element.jumlah > 10) {
            totalDiskon.push(element.harga * element.jumlah * 0.1)
        }
    });
    return totalDiskon;
  }