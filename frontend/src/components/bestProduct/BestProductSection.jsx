import './product.css';
import { Link } from 'react-router'
import BestProductCardList from './BestProductCardList';
const BestProductSection = () => {
  return (
    <section className='product-section'>
      <div className='product-section-content'>
        <p>Menu Terbaik</p>
        <h1>Sajian Terbaik Untuk Anda</h1>
      </div>
      <BestProductCardList />
      <div className='product-section-a'>
        <Link to={"/products"}>Lihat Semua Produk</Link>
      </div>
    </section>
  )
}

export default BestProductSection