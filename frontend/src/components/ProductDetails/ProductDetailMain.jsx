import './productDetail.css'
import { Link, useParams } from 'react-router'
import { getDimsumById } from '../../lib/dummy'
import { useState } from 'react'
const ProductDetailMain = () => {
  const [qnty, setQnty] = useState(1);
  const { id } = useParams();
  const dimsum = getDimsumById(Number(id));
  const increaseQnty = () => {
    setQnty(prev => prev + 1);
  }

  const decreaseQnty = () => {
    if (qnty > 1) {
        setQnty(prev => prev -1);
    }
  }
  return (
    <div className='product-detail'>
        <Link to={'/products'}>Kembali</Link>
        <div className='product-detail-wrapper'>
            <div className='product-detail-content'>
                <div className='product-detail-content-img'>
                    <img src={ dimsum?.img_url ? dimsum?.img_url : '/hero-example.png' } alt="" style={{ width: '100%', height: '100%' }} />
                </div>
               
            </div>
            <div className='product-detail-checkout'>
                <p className='product-detail-name'>{ dimsum.name }</p>
                <p className="product-detail-description">{ dimsum.description }</p>
                <div className='button-qnty'>
                    <button onClick={decreaseQnty} className='button-first'>-</button>
                    <p className=''>{ qnty }</p>
                    <button onClick={increaseQnty} className='button-second'>+</button>
                </div>
                <p className='price-text'>total price</p>
                <p className='total-price'>{ 12000 * qnty }</p>
                <button className='button-checkout'>Checkout</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetailMain