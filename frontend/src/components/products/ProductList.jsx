import ProductCard from "./ProductCard"
import { getAllDimsums } from "../../lib/dummy"
const ProductList = () => {
  const dimsums = getAllDimsums();  
  return (
    <div className="product-list">
        {
            dimsums.map((dimsum) => <ProductCard id={dimsum.id} name={dimsum.name} rating={dimsum.rating} img_url={dimsum.img_url} key={dimsum.id} />)
        }
    </div>
  )
}

export default ProductList