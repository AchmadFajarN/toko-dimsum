import './products.css'
import ListCategory from './ListCategory'
import ProductList from './ProductList'
const MainProduct = () => {
  return (
    <div className="main-product">
      <h1 className='main-product-header-categories'>Categories</h1>
      <ListCategory />
      <ProductList />
    </div>
  )
}

export default MainProduct
