/* eslint-disable react/prop-types */
const BestProductCard = ({ name, img_url,rating, description }) => {
  return (
    <div className="best-product-card">
        <div className="best-product-card-image">
            <img src={ img_url ? img_url : './hero-example.png' } alt="" />
        </div>
        <div className="best-product-card-content">
            <p className="title">{ name }</p>
            <p className="description">{description}</p>
            <p>{ rating }</p>
        </div>
    </div>
  )
}

export default BestProductCard