import './productDetail.css'
import { Link } from 'react-router'
import { useCheckout } from '../../hooks/useCheckout'
import { useProductDetail } from '../../hooks/useProductDetail'
import { convertToRupiah } from '../../lib/formatToRupiah'

const ProductDetailMain = () => {
  const { product: dimsum } = useProductDetail();
  const { qnty, decreaseQnty, increaseQnty, handleCheckout, errMessage } = useCheckout();

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
                <p className='product-detail-name'>{ dimsum?.name }</p>
                <p className="product-detail-description">{ dimsum?.description }</p>
                <div className='button-qnty'>
                    <button onClick={decreaseQnty} className='button-first'>-</button>
                    <p className=''>{ qnty }</p>
                    <button onClick={increaseQnty} className='button-second'>+</button>
                </div>
                <p className='price-text'>total price</p>
                <p className='total-price'>{ convertToRupiah(dimsum?.price * qnty) }</p>
                <button onClick={() => handleCheckout(dimsum?.id)} className='button-checkout'>Checkout</button>
                {
                    errMessage && <p className='text-err'>{ errMessage }</p>
                }
                
            </div>
        </div>
    </div>
  )
}

export default ProductDetailMain