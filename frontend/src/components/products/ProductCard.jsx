/* eslint-disable react/prop-types */
import { convertToRupiah } from '../../lib/formatToRupiah'
import { Link } from 'react-router'
const ProductCard = ({ name, rating, img_url, id, price }) => {
  return (
    <div className="card-product">
        <div className="card-product-img-container">
            <img src={ img_url ? img_url : '/hero-example.png' } alt="" className="card-product-img" />
        </div>
        <div className="card-product-content">
            <p className="card-product-name">{ name }</p>
            <p className="card-product-price">{ convertToRupiah(price) }</p>
            <p className="card-product-rating">{ rating }</p>
            <Link to={`/products/${id}`} className="card-product-button">Check out</Link>
        </div>
    </div>
  )
}

export default ProductCard