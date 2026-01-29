import { getDisplayDimsum } from "../../lib/dummy";
import BestProductCard from "./BestProductCard";
const BestProductCardList = () => {
  return (
    <div className="best-product-card-container">
        {
            getDisplayDimsum().map((dimsum) => (
                <BestProductCard 
                key={dimsum.id} 
                name={dimsum.name} 
                rating={dimsum.rating} 
                description={dimsum.description} />
            ))
        }
    </div>
  )
}

export default BestProductCardList