import Category from "../ui/Category"

const ListCategory = () => {
  const categoris = ['mentai', 'dimsum', 'all'];
  return (
    <div className="list-category">
        {
            categoris.map((cat, i) => <Category name={cat} key={i} />)
        }
    </div>
  )
}

export default ListCategory