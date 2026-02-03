export const convertToRupiah = (harga) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(harga);

  return rupiah;
};
