/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((dimsum) => (
        <ProductCard
          id={dimsum?.id}
          name={dimsum?.name}
          rating={dimsum?.rating}
          img_url={dimsum?.img_url}
          key={dimsum?.id}
          price={dimsum?.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
