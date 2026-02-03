import './products.css'
import ListCategory from './ListCategory'
import ProductList from './ProductList'
import { useProduct } from '../../hooks/useProduct'

const MainProduct = () => {
  const { products } = useProduct();
  return (
    <div className="main-product">
      <h1 className='main-product-header-categories'>Categories</h1>
      <ListCategory />
      <ProductList products={products} />
    </div>
  )
}

export default MainProduct
