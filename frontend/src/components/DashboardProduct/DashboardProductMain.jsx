import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useProduct } from "../../hooks/useProduct";
import TableProduct from "./TableProducr";
import "./dashboardProduct.css"
import { useAddProduct } from "../../hooks/useAddProduct";

const DashboardProductMain = () => {
  const { products, refetch } = useProduct();
  const { logout } = useAuth();
  const { handleSubmit, form, handleChange } = useAddProduct(refetch);

  const data = [
    {
      name: "order",
      path: "/dashboard",
    },
    {
      name: "product",
      path: "/dashboard/product",
    },
  ];

  return (
    <>
      <header className="header-scroll">
        <h1 className="header-heading">admin</h1>
        <nav className="header-nav">
          <ul className="header-nav-ul">    
            {data.map((d, i) => {
              return (
                <li key={i} className="header-nav-ul-li">
                  <Link to={d.path} className="header-nav-ul-li-a-scroll">
                    {d.name}
                  </Link>
                </li>
              );
            })}
            <li onClick={logout} className="header-nav-ul-li">
              <button className="btn btn-logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-dashboard">
            <TableProduct data={products} form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      </main>
    </>
  );
};

export default DashboardProductMain;
