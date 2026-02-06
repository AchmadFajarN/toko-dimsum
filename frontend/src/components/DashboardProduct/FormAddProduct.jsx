/* eslint-disable react/prop-types */

const FormAddProduct = ({ close, handleSubmit, form, handleChange }) => {
  
  return (
    <>
      <div onClick={close} className="form-container"></div>
      <form
        className="product-form"
        onSubmit={handleSubmit}
      >
        <h2>Tambah Produk</h2>

        <div className="form-group">
          <label>Nama Produk</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama produk"
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi produk"
          />
        </div>

        <div className="form-group">
          <label>Harga</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="form-group">
          <div className="form-group">
            <label>Gambar Produk</label>
            <input
              type="file"
              name="img_url"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          <label>Tampilkan Produk</label>
        </div>

        <button type="submit">Simpan</button>
      </form>
    </>
  );
};

export default FormAddProduct;
